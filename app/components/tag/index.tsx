import { ComponentPropsWithoutRef } from 'react';
import { LinksFunction } from 'remix';
import { cs } from '~/utils/cs';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

type Props = {
  text: string
};

export function Tag({ text, className, ...props }: Props & ComponentPropsWithoutRef<'span'>) {
  return (
    <span className={cs('tag', className)} {...props}>
      {text}
    </span>
  );
}
