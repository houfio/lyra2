import normalize from 'normalize.css';
import { Links, LinksFunction, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap' },
  { rel: 'stylesheet', href: normalize },
  { rel: 'stylesheet', href: styles }
];

export default function App() {
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
        <ScrollRestoration/>
        <Scripts/>
        {process.env.NODE_ENV === 'development' && <LiveReload/>}
      </body>
    </html>
  );
}
