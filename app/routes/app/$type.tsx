import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons';
import { Link, LoaderFunction, MetaFunction, useParams } from 'remix';
import { Button } from '~/components/button';
import { Container } from '~/components/container';
import { capitalize } from '~/utils/capitalize';
import { notFound } from '~/utils/notFound';

export const meta: MetaFunction = ({ params: { type } }) => ({
  title: `${capitalize(type ?? '')} | Lyra`
});

export const loader: LoaderFunction = async ({ params: { type } }) => {
  if (type !== 'playlists' && type !== 'albums') {
    throw notFound();
  }

  return {};
};

export default function () {
  const { type } = useParams();

  return (
    <Container>
      <Button as={Link} text="Back" mode="gray" leftIcon={faChevronLeft} to="/app"/>
      {type}
    </Container>
  );
}
