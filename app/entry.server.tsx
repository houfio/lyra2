import { renderToString } from 'react-dom/server';
import { RemixServer } from 'remix';
import type { EntryContext } from 'remix';

export default function (request: Request, status: number, headers: Headers, context: EntryContext) {
  const markup = renderToString(
    <RemixServer context={context} url={request.url}/>
  );

  headers.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${markup}`, {
    status,
    headers
  });
}
