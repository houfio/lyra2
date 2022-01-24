import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createElement } from 'react';
import { LinksFunction } from 'remix';
import { cs } from '~/utils/cs';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

type Props = {
  name: string,
  cover: string,
  selected?: boolean,
  setSelected?: () => void
};

export function Collection({ name, cover, selected, setSelected }: Props) {
  return createElement(setSelected ? 'button' : 'div', {
    className: cs('collection', { 'collection-selected': selected }),
    style: { backgroundImage: `url(${cover})` },
    onClick: setSelected
  }, (
    <>
      {name}
      <FontAwesomeIcon icon={faCheck} className="collection-check"/>
    </>
  ));
}
