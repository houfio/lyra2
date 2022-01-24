import { LinksFunction } from 'remix';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

type Props = {
  name: string,
  cover: string
};

export function Collection({ name, cover }: Props) {
  return (
    <div className="collection">
      <img src={cover} className="collection-cover"/>
      {name}
    </div>
  );
}
