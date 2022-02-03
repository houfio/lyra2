import { useDialoog } from 'dialoog';
import { ComponentPropsWithoutRef } from 'react';
import { LinksFunction } from 'remix';
import { Button } from '~/components/button';
import { Collection, links as collectionLinks } from '~/components/collection';
import { Column, links as columnLinks } from '~/components/column';
import { Dialog } from '~/components/dialog';
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
  big?: boolean
};

export function CollectionList({ text, collections, big = false }: Props) {
  const [, { open }] = useDialoog();

  return (
    <div className="collection-list">
      <div className="collection-list-header">
        {text}
        <Button
          text="See more"
          mode="gray"
          onClick={open.c((props) => (
            <Dialog {...props}>
              {collections.map((c, i) => (
                <div key={i}>
                  {c.name}
                </div>
              ))}
            </Dialog>
          ))}
        />
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
