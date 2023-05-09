import { logout, requireToken } from '~/session.server';

export async function get<T>(request: Request, url: string) {
  const { accessToken } = await requireToken(request);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw await logout(request);
  }

  return await response.json() as T;
}
