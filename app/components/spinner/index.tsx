import { ComponentPropsWithoutRef } from 'react';
import { LinksFunction } from 'remix';
import { cs } from '~/utils/cs';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

export function Spinner(props: ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props} className={cs('spinner', props.className)}/>
  );
}
