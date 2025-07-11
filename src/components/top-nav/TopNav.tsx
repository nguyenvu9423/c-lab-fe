import * as React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PrincipalSelectors } from '@/store/selectors';
import { LoadingState } from '@/store/common';

import { SearchBar } from '../search';
import { LogoWithName } from '../logo';
import { AnonymousControlMenu } from './AnonymousControlMenu';
import { UserControlMenu } from './UserControlMenu';

export const TopNav: React.FC = () => {
  const { loadingState, principal } = useSelector(
    PrincipalSelectors.principalDataHolder(),
  );

  return (
    <Menu id="top-nav" fixed="top">
      <Container>
        <Menu.Menu position="left">
          <Menu.Item header as={Link} to="/">
            <LogoWithName height={24} />
          </Menu.Item>
          <Menu.Item as={Link} to="/articles" content="Bài viết" />
          <Menu.Item as={Link} to="/problems" content="Bài tập" />
          <Menu.Item as={Link} to="/contests" content="Kỳ thi" />
        </Menu.Menu>

        <Menu.Menu position="right">
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
