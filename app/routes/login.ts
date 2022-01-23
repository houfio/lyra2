import { addSeconds } from 'date-fns';
import { LoaderFunction, redirect } from 'remix';
import { authCookie, stateCookie } from '~/cookies';
import { TokenResponse } from '~/types';
import { url } from '~/utils/url';

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const state = await stateCookie.parse(request.headers.get('cookie'));

  if (searchParams.has('error') || searchParams.get('state') !== state) {
    return redirect(`/?error`);
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    body: url(undefined, {
      grant_type: 'authorization_code',
      code: searchParams.get('code') ?? '',
      redirect_uri: process.env.REDIRECT_URI ?? ''
    }),
    headers: {
      'authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded'
    }
  });

  if (!response.ok) {
    return redirect(`/?error`);
  }

  const data = await response.json() as TokenResponse;

  return redirect('/app', {
    headers: {
      'set-cookie': await authCookie.serialize({
        ...data,
        expires_on: addSeconds(Date.now(), data.expires_in)
      })
    }
  });
};
