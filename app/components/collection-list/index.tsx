import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import { ComponentPropsWithoutRef } from 'react';
import { Link, LinksFunction } from 'remix';
import { Button } from '~/components/button';
import { Collection, links as collectionLinks } from '~/components/collection';
import { Column, links as columnLinks } from '~/components/column';
import { links as rowLinks, Row } from '~/components/row';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...collectionLinks(),
  ...columnLinks(),
  ...rowLinks()
];

type Props = {
  text: string,
  collections: Omit<ComponentPropsWithoutRef<typeof Collection>, 'big'>[],
  to: string,
  big?: boolean
};

export function CollectionList({ text, collections, to, big = false }: Props) {
  return (
    <div className="collection-list">
      <div className="collection-list-header">
        {text}
        <Button as={Link} text="See more" mode="gray" rightIcon={faChevronRight} to={to}/>
      </div>
      <Row gaps={{ phone: 1, tablet: 2, desktop: 3 }}>
        {collections.map((collection, index) => (
          <Column key={index} sizes={{ phone: big ? 2 : 6, tablet: big ? 2 : 3, laptop: big ? 1 : 2 }}>
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
