import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { LinksFunction } from 'remix';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

type Props = {
  text: string
};

export function Alert({ text }: Props) {
  const [dismissed, setDismissed] = useState(false);

  return dismissed ? null : (
    <div className="alert">
      <span>
        {text}
      </span>
      <button onClick={() => setDismissed(true)}>
        <FontAwesomeIcon icon={faTimes}/>
      </button>
    </div>
  );
}
