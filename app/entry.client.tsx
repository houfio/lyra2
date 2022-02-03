import { DialoogProvider } from 'dialoog';
import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';

hydrate((
  <DialoogProvider>
    <RemixBrowser/>
  </DialoogProvider>
), document);
