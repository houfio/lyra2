export type TokenResponse = {
  access_token: string,
  token_type: string,
  expires_in: number,
  refresh_token: string,
  scope: string
};

export type TokenCookie = TokenResponse & {
  expires_on: string
};

export type MeResponse = Identifiable<{
  display_name: string,
  followers: Collection,
  images: Image[]
}>;

export type PlaylistsResponse = Collection<Playlist>;

export type AlbumsResponse = Collection<{
  added_at: string,
  album: Album
}>;

type Identifiable<T = {}> = T & {
  id: string,
  type: string,
  uri: string,
  href: string,
  external_urls: {
    spotify: string
  }
};

type Collection<T = number> = {
  href: string,
  total: number
} & (T extends number ? {} : {
  items: T[],
  limit: number,
  offset: number,
  next?: string,
  previous?: string
});

type Artist = Identifiable<{
  name: string
}>;

type Album = Identifiable<{
  name: string,
  label: string,
  artists: Artist[],
  images: Image[],
  tracks: Collection<Track>
}>;

type Playlist = Identifiable<{
  name: string,
  public: boolean,
  collaborative: boolean,
  images: Image[],
  owner: Identifiable,
  tracks: Collection
}>;

type Track = Identifiable<{
  name: string,
  track_number: number,
  disc_number: boolean,
  explicit: boolean,
  duration_ms: number,
  is_local: boolean,
  artists: Artist[]
}>;

type Image = {
  url: string,
  width?: number,
  height?: number
};
