import * as React from 'react';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { SearchBar } from '../../components/search/SearchBar';
import { logout } from '../../store/actions';
import {
  AuthorizationSelectors,
  PrincipalSelectors,
} from '../../store/selectors';
import { LoadingState } from '../../store/common';
import { LoginButton } from '../../page/common/buttons/LoginButton';

function AnonymousControlMenu() {
  return (
    <>
      <Menu.Item>
        <Button primary as={Link} to={'/register'}>
          Đăng kí
        </Button>
      </Menu.Item>
      <Menu.Item>
        <LoginButton />
      </Menu.Item>
    </>
  );
}

function UserControlMenu(props) {
  const { user } = props;
  const history = useHistory();

  const handleLogOut = React.useCallback(() => {
    history.push('/logout');
  }, [history]);

  const canCreateArticle = useSelector(
    AuthorizationSelectors.canCreateArticle()
  );
  const canCreateProblem = useSelector(
    AuthorizationSelectors.canCreateProblem()
  );
  const hasAdminRole = useSelector(AuthorizationSelectors.hasAdminRole());

  return (
    <>
      {(canCreateArticle || canCreateProblem) && (
        <Menu.Item>
          <Dropdown
            button
            floating
            className="icon"
            labeled
            icon="edit"
            text="Create"
          >
            <Dropdown.Menu>
              {canCreateArticle && (
                <Dropdown.Item
                  as={Link}
                  to="/articles/add"
                  text="Article"
                  icon="book"
                />
              )}
              {canCreateProblem && (
                <Dropdown.Item
                  as={Link}
                  to="/problems/add"
                  text="Problem"
                  icon="tasks"
                />
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      )}

      <Dropdown item text={user.lastName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={`/users/${user.username}`}
            icon="user"
            text="Profile"
          />
          <Dropdown.Divider />
          {hasAdminRole && (
            <Dropdown.Item
              as={Link}
              to="/admin"
              icon="setting"
              text="Admin panel"
            />
          )}
          <Dropdown.Item
            icon="angle double right"
            text="Log out"
            onClick={handleLogOut}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export function TopNav() {
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
}
