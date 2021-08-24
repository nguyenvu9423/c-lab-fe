import * as React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SearchBar } from '../../components/search/SearchBar';
import { PrincipalSelectors } from '../../store/selectors';
import { LoadingState } from '../../store/common';
import { AnonymousControlMenu } from './AnonymousControlMenu';
import { UserControlMenu } from './UserControlMenu';

export const TopNav: React.FC = () => {
  const { loadingState, principal } = useSelector(
    PrincipalSelectors.principalDataHolder()
  );

  return (
    <Menu id="top-nav" fixed="top">
      <Container>
        <Menu.Item header as={Link} to={'/'}>
          Log N
        </Menu.Item>
        <Menu.Item as={Link} to={'/articles'} content="Bài viết" />

        <Menu.Item as={Link} to={'/problems'}>
          Bài tập
        </Menu.Item>

        <Menu.Menu position={'right'}>
          <Menu.Item>
            <SearchBar />
          </Menu.Item>

          {LoadingState.isDone(loadingState) ? (
            principal ? (
              <UserControlMenu user={principal} />
            ) : (
              <AnonymousControlMenu />
            )
          ) : undefined}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
