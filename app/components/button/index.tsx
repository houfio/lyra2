import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentPropsWithoutRef, createElement, ElementType } from 'react';
import { LinksFunction } from 'remix';
import { links as spinnerLinks, Spinner } from '~/components/spinner';
import { cs } from '~/utils/cs';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...spinnerLinks()
];

type Props<T> = {
  as?: T,
  text: string,
  mode?: 'green' | 'gray',
  loading?: boolean,
  leftIcon?: IconProp,
  rightIcon?: IconProp
};

export function Button<T extends ElementType = 'button'>({
  as,
  text,
  mode = 'green',
  loading,
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  ...props
}: Props<T> & ComponentPropsWithoutRef<T>) {
  return createElement(as ?? 'button', {
    title: text,
    disabled: loading || disabled,
    className: cs('button', `button-${mode}`, className),
    ...props
  }, (
    <>
      <span className={cs({ 'button-loading': loading })}>
        {leftIcon && (
          <FontAwesomeIcon icon={leftIcon} className="button-icon-left"/>
        )}
        {children ?? text}
        {rightIcon && (
          <FontAwesomeIcon icon={rightIcon} className="button-icon-right"/>
        )}
      </span>
      {loading && (
        <Spinner/>
      )}
    </>
  ));
}
