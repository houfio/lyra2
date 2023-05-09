import { Form } from '@remix-run/react';
import type { LoaderArgs } from '@vercel/remix';
import { redirect } from '@vercel/remix';

import { getToken } from '~/session.server';
import { url } from '~/utils/url';

export const loader = async ({ request }: LoaderArgs) => {
  const token = await getToken(request);

  if (!token) {
    return null;
  }

  return redirect('/app');
};

export const action = async () => redirect(url('https://accounts.spotify.com/authorize', {
  response_type: 'code',
  client_id: process.env.SPOTIFY_CLIENT_ID ?? '',
  scope: 'streaming,user-read-private',
  redirect_uri: process.env.SPOTIFY_REDIRECT_URL ?? ''
}));

export default function Index() {
  return (
    <div>
      <Form method="post">
        <button type="submit">
          Login
        </button>
      </Form>
    </div>
  );
}
