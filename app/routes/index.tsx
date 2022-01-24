import { nanoid } from 'nanoid';
import { ActionFunction, Form, LinksFunction, MetaFunction, redirect, useSearchParams, useTransition } from 'remix';
import { Alert, links as alertLinks } from '~/components/alert';
import { Button, links as buttonLinks } from '~/components/button';
import { Container, links as containerLinks } from '~/components/container';
import { stateCookie } from '~/cookies';
import { url } from '~/utils/url';

export const meta: MetaFunction = () => ({
  title: 'Lyra | Guess your songs'
});

export const links: LinksFunction = () => [
  ...alertLinks(),
  ...buttonLinks(),
  ...containerLinks()
];

export const action: ActionFunction = async () => {
  const state = nanoid();

  return redirect(url('https://accounts.spotify.com/authorize', {
    response_type: 'code',
    client_id: process.env.CLIENT_ID ?? '',
    scope: 'playlist-read-private,user-library-read',
    redirect_uri: process.env.REDIRECT_URI ?? '',
    state
  }), {
    headers: {
      'set-cookie': await stateCookie.serialize(state)
    }
  });
};

export default function () {
  const [searchParams] = useSearchParams();
  const { state } = useTransition();

  return (
    <Container>
      {searchParams.has('error') && (
        <Alert text="Oops, something went wrong! Please try again."/>
      )}
      Welcome to Lyra!
      <Form method="post">
        <Button text="login" type="submit" loading={state === 'submitting'}/>
      </Form>
    </Container>
  );
}
