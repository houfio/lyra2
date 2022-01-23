import { json, LinksFunction, LoaderFunction, MetaFunction, Outlet, useLoaderData } from 'remix';
import { links as navigationLinks, Navigation } from '~/components/navigation';
import { authCookie } from '~/cookies';
import { db } from '~/db.server';
import { MeResponse } from '~/types';
import { get } from '~/utils/get';
import { getAuth } from '~/utils/getAuth';

export const meta: MetaFunction = () => ({
  title: 'Dashboard | Lyra'
});

export const links: LinksFunction = () => [
  ...navigationLinks()
];

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await getAuth(request);
  const data = await get<MeResponse>(auth, 'https://api.spotify.com/v1/me');

  await db.$connect();
  await db.user.upsert({
    where: {
      spotifyId: data.id
    },
    create: {
      spotifyId: data.id
    },
    update: {
      lastSeen: new Date()
    }
  });
  await db.$disconnect();

  return json(data, {
    headers: {
      'set-cookie': await authCookie.serialize(auth)
    }
  });
};

export default function () {
  const data = useLoaderData<MeResponse>();

  return (
    <>
      <Navigation user={data}/>
      <Outlet context={data}/>
    </>
  );
}
