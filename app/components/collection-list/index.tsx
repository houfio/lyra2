import { ComponentPropsWithoutRef } from 'react';
import { LinksFunction } from 'remix';
import { Collection, links as collectionLinks } from '~/components/collection';
import { Column, links as columnLinks } from '~/components/column';
import { links as rowLinks, Row } from '~/components/row';

import styles from './styles.css';
import { Button } from '~/components/button';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...collectionLinks(),
  ...columnLinks(),
  ...rowLinks()
];

type Props = {
  text: string,
  collections: Omit<ComponentPropsWithoutRef<typeof Collection>, 'big'>[],
  big?: boolean
};

export function CollectionList({ text, collections, big = false }: Props) {
  return (
    <div className="collection-list">
      <div className="collection-list-header">
        {text}
        <Button text="See more" mode="gray"/>
      </div>
      <Row gaps={{ phone: 2 }}>
        {collections.map((collection, index) => (
          <Column key={index} sizes={{ phone: big ? 1 : 2 }}>
            <Collection
              {...collection}
              big={big}
            />
          </Column>
        ))}
      </Row>
    </div>
  );
}
