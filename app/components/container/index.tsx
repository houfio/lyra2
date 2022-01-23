import { ComponentPropsWithoutRef, createElement, ElementType } from 'react';
import { LinksFunction } from 'remix';
import { cs } from '~/utils/cs';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

type Props<T> = {
  as?: T
};

export function Container<T extends ElementType = 'div'>({ as, className, ...props }: Props<T> & ComponentPropsWithoutRef<T>) {
  return createElement(as ?? 'div', {
    className: cs('container', className),
    ...props
  });
}
