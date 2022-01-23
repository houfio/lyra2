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

export type MeResponse = Identifiable<Identifiable<{
  display_name: string,
  followers: Collection,
  images: Image[]
}>>;

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

type Image = {
  url: string,
  width?: number,
  height?: number
};
