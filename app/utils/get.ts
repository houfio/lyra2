import { TokenCookie } from '~/types';

export async function get<T>(auth: TokenCookie, url: string) {
  const response = await fetch(url, {
    headers: {
      authorization: `${auth.token_type} ${auth.access_token}`
    }
  });

  if (!response.ok) {
    throw response;
  }

  return await response.json() as T;
}
