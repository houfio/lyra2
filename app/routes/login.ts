import type { LoaderArgs} from '@vercel/remix';
import { redirect } from '@vercel/remix';

import { createUserSession } from '~/session.server';
import type { TokenResponse } from '~/types';
import { url } from '~/utils/url';

export const loader = async ({ request }: LoaderArgs) => {
  const { searchParams } = new URL(request.url);

  if (searchParams.has('error')) {
    return redirect('/');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    body: url(undefined, {
      grant_type: 'authorization_code',
      code: searchParams.get('code') ?? '',
      redirect_uri: process.env.SPOTIFY_REDIRECT_URL ?? ''
    }),
    headers: {
      'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (!response.ok) {
    return redirect('/');
  }

  const data = await response.json() as TokenResponse;

  return createUserSession(request, data);
}
