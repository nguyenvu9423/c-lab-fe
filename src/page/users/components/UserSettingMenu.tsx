import * as React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { User } from '../../../domains/user';

export namespace UserSettingMenu {
  export interface Props {
    user: User;
  }
}

export const UserSettingMenu: React.FC<UserSettingMenu.Props> = (props) => {
  const { user } = props;
  const history = useHistory();

  return (
    <Menu vertical fluid>
      <Menu.Item
        name="update-info"
        link
        as={Link}
        to={user ? `${user.username}/edit` : ''}
      >
        <Icon name="edit" />
        Sửa thông tin
      </Menu.Item>
      <Menu.Item
        link
        as={Link}
        to={user ? `${user.username}/change-password` : ''}
      >
        <Icon name="lock" />
        Đổi mật khẩu
      </Menu.Item>
      <Menu.Item name="logout" link onClick={() => history.push('/logout')}>
        <Icon name="angle double right" />
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
};
