import { TokenCookie } from '~/types';

export function withAuth(auth: TokenCookie, extra?: object) {
  return {
    authorization: `${auth.token_type} ${auth.access_token}`,
    ...extra
  };
}
