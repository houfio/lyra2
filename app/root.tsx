import { Dialoog } from 'dialoog';
import normalize from 'normalize.css';
import { useEffect } from 'react';
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useSearchParams
} from 'remix';
import { links as dialogLinks } from '~/components/dialog';
import { links as notificationLinks } from '~/components/notification';
import { useNotify } from '~/hooks/useNotify';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap' },
  { rel: 'stylesheet', href: normalize },
  { rel: 'stylesheet', href: styles },
  ...dialogLinks(),
  ...notificationLinks()
];

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const notify = useNotify();

  useEffect(() => {
    const notification = searchParams.get('notify');

    if (!notification) {
      return;
    }

    notify(notification);
    searchParams.delete('notify');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, notify]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <Meta/>
        <Links/>
      </head>
      <body>
        <Outlet/>
        <Dialoog/>
        <ScrollRestoration/>
        <Scripts/>
        {process.env.NODE_ENV === 'development' && <LiveReload/>}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const { status, statusText } = useCatch();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Lyra | Not found</title>
        <Links/>
      </head>
      <body>
        Oops, something went wrong!
        <div>
          {status} {statusText}
        </div>
        <Scripts/>
      </body>
    </html>
  );
}
