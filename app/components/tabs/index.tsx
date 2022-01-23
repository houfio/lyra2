import { Children, ReactNode, useState } from 'react';
import { LinksFunction } from 'remix';
import { cs } from '~/utils/cs';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

type Props = {
  tabs: string[],
  children?: ReactNode
};

export function Tabs({ tabs, children }: Props) {
  const [active, setActive] = useState(0);

  const content = Children.toArray(children);

  return (
    <div className="tabs">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cs('tab', { 'tab-active': active === index })}
            onClick={() => setActive(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      {content[active]}
    </div>
  );
}
