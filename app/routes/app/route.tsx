import { Outlet } from '@remix-run/react';
import type { LoaderArgs } from '@vercel/remix';
import { json } from '@vercel/remix';

import { requireUser } from '~/session.server';

export const loader = async ({ request }: LoaderArgs) => json({
  user: await requireUser(request)
});

export default function App() {
  return (
    <div>
      app
      <Outlet/>
    </div>
  )
}
