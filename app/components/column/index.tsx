import { ComponentPropsWithoutRef, createElement, ElementType } from 'react';
import { LinksFunction } from 'remix';
import { cs } from '~/utils/cs';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

type Props<T> = {
  as?: T,
  sizes: Record<string, number>
};

export function Column<T extends ElementType = 'div'>({
  as,
  sizes,
  className,
  ...props
}: Props<T> & ComponentPropsWithoutRef<T>) {
  const sizeClasses = Object.entries(sizes).map(([k, v]) => `column-${k}-${v}`);

  return createElement(as ?? 'div', {
    className: cs('column', ...sizeClasses, className),
    ...props
  });
}
