import { faCheck } from '@fortawesome/pro-solid-svg-icons';
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
  big?: boolean,
  selected?: boolean,
  setSelected?: () => void
};

export function Collection({ name, cover, big = false, selected, setSelected }: Props) {
  return createElement(setSelected ? 'button' : 'div', {
    className: cs('collection', { 'collection-big': big, 'collection-selected': selected }),
    style: { backgroundImage: `url(${cover})` },
    onClick: setSelected
  }, (
    <>
      <div className="collection-name">{name}</div>
      <FontAwesomeIcon icon={faCheck} className="collection-check"/>
    </>
  ));
}
