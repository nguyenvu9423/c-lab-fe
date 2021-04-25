import * as React from 'react';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchUser, clearUser } from '../../store/actions/user';
import { SearchBar } from '../../components/search/SearchBar';
import { Target } from '../../store/reducers/target';
import { useSelector, useDispatch } from 'react-redux';
import { UserSelectors } from '../../store/selectors/UserSelectors';

function NotLoginUserControlMenu() {
  return (
    <>
      <Menu.Item>
        <Button primary as={Link} to={'/register'}>
          Đăng kí
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button as={Link} to={'/login'}>
          Đăng Nhập
        </Button>
      </Menu.Item>
    </>
  );
}

function UserControlMenu(props) {
  const { user } = props;
  return (
    <>
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
            <Dropdown.Item
              as={Link}
              to={'/articles/add'}
              text={'Article'}
              icon="book"
            />
            <Dropdown.Item
              as={Link}
              to={'/problems/add'}
              text={'Problem'}
              icon="tasks"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>

      <Dropdown item text={user.lastName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={`/users/${user.username}`}
            icon={'user'}
            text={'Profile'}
          />
          <Dropdown.Item icon={'book'} text={'Upload problem'} />
          <Dropdown.Divider />
          <Dropdown.Item
            icon={'angle double right'}
            text={'Log out'}
            as={Link}
            to={'/logout'}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export function TopNav() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const state = useSelector(state => state.authentication);

  const principal = useSelector(UserSelectors.byId(state.user.id));

  const loadUser = React.useCallback(() => {
    dispatch(
      fetchUser.request(
        { isPrincipal: true },
        { target: Target.AUTHENTICATION }
      )
    );
  }, []);

  const clear = React.useCallback(() => {
    dispatch(clearUser(undefined, { target: Target.AUTHENTICATION }));
  }, []);

  React.useEffect(() => {
    if (token) loadUser();
    else clear();
  }, [token]);

  return (
    <Menu fixed={'top'}>
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
          {principal ? (
            <UserControlMenu user={principal} />
          ) : (
            <NotLoginUserControlMenu />
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
