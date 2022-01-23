import { faArrowRightFromBracket } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, LinksFunction } from 'remix';
import { Button, links as buttonLinks } from '~/components/button';
import { Container, links as containerLinks } from '~/components/container';
import { links as tagLinks, Tag } from '~/components/tag';
import { MeResponse } from '~/types';

import styles from './styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...buttonLinks(),
  ...containerLinks(),
  ...tagLinks()
];

type Props = {
  user: MeResponse
};

export function Navigation({ user }: Props) {
  return (
    <nav className="navigation">
      <Container className="navigation-inner">
        <span>
          Lyra <Tag text="2.0"/>
        </span>
        <div className="navigation-items">
          <Button as={Link} text="Dashboard" mode="gray" to="/app"/>
          <Button as={Link} text="History" mode="gray" to="/app/history"/>
          <Link to="/logout" className="user-pill">
            {user.images.length > 0 && (
              <img src={user.images[0].url} className="user-image"/>
            )}
            {user.display_name}
            <FontAwesomeIcon icon={faArrowRightFromBracket}/>
          </Link>
        </div>
      </Container>
    </nav>
  );
}
