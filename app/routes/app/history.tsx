import { LinksFunction, MetaFunction } from 'remix';
import { Container, links as containerLinks } from '~/components/container';

export const meta: MetaFunction = () => ({
  title: 'History | Lyra'
});

export const links: LinksFunction = () => [
  ...containerLinks()
];

export default function () {
  return (
    <Container>
      History
    </Container>
  );
}
