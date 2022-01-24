import { ComponentPropsWithoutRef, createElement, ElementType } from 'react';
import { LinksFunction } from 'remix';
import { cs } from '~/utils/cs';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

type Props<T> = {
  as?: T,
  gaps?: Record<string, number>
};

export function Row<T extends ElementType = 'div'>({
  as,
  gaps = {},
  className,
  ...props
}: Props<T> & ComponentPropsWithoutRef<T>) {
  const gapClasses = Object.entries(gaps).map(([k, v]) => `row-${k}-${v}`);

  return createElement(as ?? 'div', {
    className: cs('row', ...gapClasses, className),
    ...props
  });
}
