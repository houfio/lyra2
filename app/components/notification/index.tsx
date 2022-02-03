import { DialoogProps, useDialoog } from 'dialoog';
import { LinksFunction } from 'remix';
import { useTimeout } from '~/hooks/useTimeout';
import { cs } from '~/utils/cs';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

type Props = {
  message: string,
  timeout: number
};

export function Notification({ message, timeout, index, open, close, remove }: Props & DialoogProps) {
  const [{ dialogs }] = useDialoog();

  useTimeout(timeout, close, []);

  const total = dialogs.filter((dialog) => dialog.stack === 'notifications').length - 1;

  return (
    <button
      className={cs('notification', { 'notification-open': open })}
      style={{ bottom: `${(total - index) * 4 + 1}rem` }}
      onClick={close}
      onAnimationEnd={() => !open && remove()}
    >
      {message}
    </button>
  );
}
