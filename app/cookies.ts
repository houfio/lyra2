import { createCookie } from 'remix';

export const stateCookie = createCookie('state', {
  path: '/'
});

export const authCookie = createCookie('auth', {
  path: '/',
  maxAge: 31_556_952 // one year
});
