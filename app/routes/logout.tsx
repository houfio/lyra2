import { LoaderFunction, redirect } from 'remix';
import { authCookie } from '~/cookies';

export const loader: LoaderFunction = async () => {
  return redirect('/', {
    headers: {
      'set-cookie': await authCookie.serialize('', {
        maxAge: -1
      })
    }
  });
};
