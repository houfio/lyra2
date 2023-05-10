import { createCookieSessionStorage, redirect } from '@vercel/remix';
import { addSeconds, isAfter, parseISO } from 'date-fns';
import { createTypedSessionStorage } from 'remix-utils';
import { z } from 'zod';

import { prisma } from '~/db.server';
import type { TokenResponse } from '~/types';
import { get } from '~/utils/get';
import { url } from '~/utils/url';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production'
  }
});

const typedSessionStorage = createTypedSessionStorage({
  sessionStorage,
  schema: z.object({
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
    expiry: z.string().optional()
  })
});

function getSession(request: Request) {
  const cookie = request.headers.get('Cookie');

  return typedSessionStorage.getSession(cookie);
}

export async function getToken(request: Request) {
  const session = await getSession(request);
  const accessToken = session.get('accessToken');
  const refreshToken = session.get('refreshToken');
  const expiry = session.get('expiry');

  if (!accessToken || !refreshToken || !expiry) {
    return;
  }

  return { accessToken, refreshToken, expiry };
}

export async function requireToken(request: Request) {
  const token = await getToken(request);

  if (!token) {
    throw redirect(`/`);
  } else if (isAfter(new Date(), parseISO(token.expiry))) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: url(undefined, {
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      }),
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw await logout(request);
    }

    const data = await response.json() as TokenResponse;

    return await createUserSession(request, data, request.url);
  }

  return token;
}

export async function requireUser(request: Request) {
  const response = await get<{ id: string }>(request, 'https://api.spotify.com/v1/me');

  return prisma.user.upsert({
    where: {
      spotifyId: response.id
    },
    create: {
      spotifyId: response.id
    },
    update: {
      lastSeen: new Date()
    }
  });
}

export async function createUserSession(request: Request, token: TokenResponse, destination = '/') {
  const session = await getSession(request);

  session.set('accessToken', token.access_token);
  session.set('refreshToken', token.refresh_token);
  session.set('expiry', addSeconds(Date.now(), token.expires_in).toISOString());

  return redirect(destination, {
    headers: {
      'Set-Cookie': await typedSessionStorage.commitSession(session, {
        maxAge: 31_556_952 // one year
      })
    }
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);

  return redirect('/', {
    headers: {
      'Set-Cookie': await typedSessionStorage.destroySession(session)
    }
  });
}
