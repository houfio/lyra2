import { DialoogProps } from 'dialoog';
import { ComponentPropsWithoutRef } from 'react';
import { LinksFunction } from 'remix';
import { cs } from '~/utils/cs';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

export function Dialog({
  open,
  close,
  remove,
  index,
  className,
  ...props
}: DialoogProps & ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cs('dialog-backdrop', { 'dialog-backdrop-open': open })} onClick={close}>
      <div
        className={cs('dialog', { 'dialog-open': open }, className)}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={() => !open && remove()}
        {...props}
      />
    </div>
  );
}
