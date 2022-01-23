import { addSeconds, isBefore, subSeconds } from 'date-fns';
import { redirect } from 'remix';
import { authCookie } from '~/cookies';
import { TokenCookie, TokenResponse } from '~/types';
import { url } from '~/utils/url';

export async function getAuth(request: Request) {
  const auth = await authCookie.parse(request.headers.get('cookie')) as TokenCookie | undefined;

  if (!auth) {
    throw redirect('/');
  }

  const expiry = subSeconds(new Date(auth.expires_on), auth.expires_in / 2);

  if (isBefore(Date.now(), expiry)) {
    return auth;
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    body: url(undefined, {
      grant_type: 'refresh_token',
      refresh_token: auth.refresh_token
    }),
    headers: {
      'authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded'
    }
  });

  if (!response.ok) {
    throw redirect('/');
  }

  const data = await response.json() as TokenResponse;

  return {
    ...auth,
    ...data,
    expires_on: addSeconds(Date.now(), data.expires_in).toString()
  };
}
