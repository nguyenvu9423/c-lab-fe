import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';
import { User } from '../../domains/user';
import { AuthorizationSelectors } from '../../store/selectors';
import { Avatar } from '../avatar/Avatar';

export const UserControlMenu: React.FC<{ user: User }> = (props) => {
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
            text="Tạo"
          >
            <Dropdown.Menu>
              {canCreateArticle && (
                <Dropdown.Item
                  as={Link}
                  to="/articles/add"
                  text="Bài viết"
                  icon="book"
                />
              )}
              {canCreateProblem && (
                <Dropdown.Item
                  as={Link}
                  to="/problems/add"
                  text="Bài tập"
                  icon="tasks"
                />
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      )}

      <Dropdown
        item
        trigger={<Avatar style={{ width: 32, height: 32 }} user={user} />}
      >
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={`/users/${user.username}`}
            icon="user"
            text="Thông tin"
          />
          <Dropdown.Divider />
          {hasAdminRole && (
            <Dropdown.Item
              as={Link}
              to="/admin"
              icon="setting"
              text="Quản lý"
            />
          )}
          <Dropdown.Item
            icon="angle double right"
            text="Đăng xuất"
            onClick={handleLogOut}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
