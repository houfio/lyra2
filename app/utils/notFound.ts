export function notFound() {
  return new Response('Not Found', {
    status: 404
  });
}
