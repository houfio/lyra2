import { LinksFunction } from 'remix';
import { Container, links as containerLinks } from '~/components/container';

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
