import * as React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SearchBar, LogoWithName } from '../../components';
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
        <Menu.Menu position="left">
          <Menu.Item header as={Link} to="/">
            <LogoWithName height={40} />
          </Menu.Item>
          <Menu.Item as={Link} to="/articles" content="Bài viết" />
          <Menu.Item as={Link} to="/problems" content="Bài tập" />
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
