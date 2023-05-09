import { Form } from '@remix-run/react';

import { useUser } from '~/hooks/useUser';

export default function App() {
  const user = useUser();

  return (
    <pre>
      {JSON.stringify(user, undefined, 2)}
      <Form action="/logout" method="post">
        <button type="submit">
          Logout
        </button>
      </Form>
    </pre>
  );
}
