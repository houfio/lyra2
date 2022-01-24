import { useState } from 'react';
import { LinksFunction, LoaderFunction, useLoaderData } from 'remix';
import { Collection, links as collectionLinks } from '~/components/collection';
import { Column, links as columnLinks } from '~/components/column';
import { Container, links as containerLinks } from '~/components/container';
import { links as rowLinks, Row } from '~/components/row';
import { AlbumsResponse, PlaylistsResponse } from '~/types';
import { get } from '~/utils/get';
import { getAuth } from '~/utils/getAuth';
import { toggle } from '~/utils/toggle';
import { url } from '~/utils/url';

export const links: LinksFunction = () => [
  ...collectionLinks(),
  ...columnLinks(),
  ...containerLinks(),
  ...rowLinks()
];

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await getAuth(request);
  const [playlists, albums] = await Promise.all([
    get(auth, url('https://api.spotify.com/v1/me/playlists', { limit: 6 })),
    get(auth, url('https://api.spotify.com/v1/me/albums', { limit: 6 }))
  ]);

  return {
    playlists,
    albums
  };
};

export default function () {
  const [selected, setSelected] = useState<string[]>([]);
  const data = useLoaderData<{ playlists: PlaylistsResponse, albums: AlbumsResponse }>();

  return (
    <Container as="main">
      <Row>
        <Column sizes={{ phone: 6 }}>
          Playlists
          <Row gaps={{ phone: 2 }}>
            {data.playlists.items.map((playlist) => (
              <Column key={playlist.id} sizes={{ phone: 1 }}>
                <Collection
                  name={playlist.name}
                  cover={playlist.images[0].url}
                  big={true}
                  selected={selected.includes(playlist.uri)}
                  setSelected={() => setSelected(toggle(playlist.uri, selected))}
                />
              </Column>
            ))}
          </Row>
          Albums
          <Row gaps={{ phone: 2 }}>
            {data.albums.items.map((album) => (
              <Column key={album.album.id} sizes={{ phone: 1 }}>
                <Collection
                  name={album.album.name}
                  cover={album.album.images[0].url}
                  selected={selected.includes(album.album.uri)}
                  setSelected={() => setSelected(toggle(album.album.uri, selected))}
                />
              </Column>
            ))}
          </Row>
        </Column>
      </Row>
    </Container>
  );
}
