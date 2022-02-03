import { DialoogProvider } from 'dialoog';
import { renderToString } from 'react-dom/server';
import { EntryContext, RemixServer } from 'remix';

export default function (request: Request, status: number, headers: Headers, context: EntryContext) {
  const markup = renderToString(
    <DialoogProvider>
      <RemixServer context={context} url={request.url}/>
    </DialoogProvider>
  );

  headers.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${markup}`, {
    status,
    headers
  });
}
