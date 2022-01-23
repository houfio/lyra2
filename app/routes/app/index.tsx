import { LinksFunction, LoaderFunction, useLoaderData } from 'remix';
import { Column, links as columnLinks } from '~/components/column';
import { Container, links as containerLinks } from '~/components/container';
import { links as rowLinks, Row } from '~/components/row';
import { links as tabsLinks, Tabs } from '~/components/tabs';
import { AlbumsResponse, PlaylistsResponse } from '~/types';
import { get } from '~/utils/get';
import { getAuth } from '~/utils/getAuth';
import { url } from '~/utils/url';

export const links: LinksFunction = () => [
  ...columnLinks(),
  ...containerLinks(),
  ...rowLinks(),
  ...tabsLinks()
];

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await getAuth(request);
  const [playlists, albums] = await Promise.all([
    get(auth, url('https://api.spotify.com/v1/me/playlists', { limit: 5 })),
    get(auth, url('https://api.spotify.com/v1/me/albums', { limit: 5 }))
  ]);

  return {
    playlists,
    albums
  };
};

export default function () {
  const data = useLoaderData<{ playlists: PlaylistsResponse, albums: AlbumsResponse }>();

  return (
    <Container as="main">
      <Row gaps={{}}>
        <Column sizes={{ phone: 3 }}>
          <Tabs tabs={['Playlists', 'Albums', 'Custom']}>
            <>
              {data.playlists.items.map((playlist) => (
                <div key={playlist.id}>
                  {playlist.name}
                </div>
              ))}
            </>
            <>
              {data.albums.items.map((album) => (
                <div key={album.album.id}>
                  {album.album.name}
                </div>
              ))}
            </>
            <>
              custom
            </>
          </Tabs>
        </Column>
      </Row>
    </Container>
  );
}
