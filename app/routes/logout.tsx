import { LoaderFunction, redirect } from 'remix';
import { authCookie } from '~/cookies';
import { url } from '~/utils/url';

export const loader: LoaderFunction = async () => {
  return redirect(url('/', { notify: 'Successfully logged out' }), {
    headers: {
      'set-cookie': await authCookie.serialize('', {
        maxAge: -1
      })
    }
  });
};
