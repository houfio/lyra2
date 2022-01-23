import { LinksFunction, LoaderFunction, useLoaderData } from 'remix';
import { Container, links as containerLinks } from '~/components/container';
import { AlbumsResponse, PlaylistsResponse } from '~/types';
import { get } from '~/utils/get';
import { getAuth } from '~/utils/getAuth';
import { url } from '~/utils/url';

export const links: LinksFunction = () => [
  ...containerLinks()
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
    <Container>
      <div>
        playlists
        {data.playlists.items.map((playlist) => (
          <div key={playlist.id}>
            {playlist.name}
          </div>
        ))}
      </div>
      <div>
        albums
        {data.albums.items.map((album) => (
          <div key={album.album.id}>
            {album.album.name}
          </div>
        ))}
      </div>
    </Container>
  );
}
