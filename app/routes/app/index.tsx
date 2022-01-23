import { LinksFunction, LoaderFunction, useLoaderData } from 'remix';
import { Container, links as containerLinks } from '~/components/container';
import { getAuth } from '~/utils/getAuth';

export const links: LinksFunction = () => [
  ...containerLinks()
];

export const loader: LoaderFunction = async ({ request }) => {
  return await getAuth(request);
};

export default function () {
  const data = useLoaderData();

  return (
    <Container>
      <pre>
        {JSON.stringify(data, undefined, 2)}
      </pre>
    </Container>
  );
}
