import { useState } from 'react';
import { LinksFunction, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { CollectionList, links as collectionListLinks } from '~/components/collection-list';
import { Container, links as containerLinks } from '~/components/container';
import { AlbumsResponse, PlaylistsResponse } from '~/types';
import { authenticate } from '~/utils/authenticate';
import { get } from '~/utils/get';
import { toggle } from '~/utils/toggle';
import { url } from '~/utils/url';

export const meta: MetaFunction = () => ({
  title: 'Dashboard | Lyra'
});

export const links: LinksFunction = () => [
  ...collectionListLinks(),
  ...containerLinks()
];

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await authenticate(request);
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
      <CollectionList
        text="Playlists"
        collections={data.playlists.items.map((playlist) => ({
          name: playlist.name,
          cover: playlist.images[0].url,
          selected: selected.includes(playlist.uri),
          setSelected: () => setSelected(toggle(playlist.uri, selected))
        }))}
        to="/app/playlists"
        big={true}
      />
      <CollectionList
        text="Albums"
        collections={data.albums.items.map((album) => ({
          name: album.album.name,
          cover: album.album.images[0].url,
          selected: selected.includes(album.album.uri),
          setSelected: () => setSelected(toggle(album.album.uri, selected))
        }))}
        to="/app/albums"
      />
    </Container>
  );
}
