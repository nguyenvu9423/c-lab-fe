import * as React from 'react';
import { Header, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { User } from '@/domains/user';

export namespace UserSettingMenu {
  export interface Props {
    user: User;
  }
}

export const UserSettingMenu: React.FC<UserSettingMenu.Props> = (props) => {
  const { user } = props;
  const navigate = useNavigate();

  return (
    <>
      <Header as="h3" content="Cài đặt" attached="top" />
      <Menu vertical fluid attached>
        <Menu.Item name="update-info" link as={Link} to="edit">
          <Icon name="edit" />
          Sửa thông tin
        </Menu.Item>
        <Menu.Item link as={Link} to="change-password">
          <Icon name="lock" />
          Đổi mật khẩu
        </Menu.Item>
        <Menu.Item name="logout" link onClick={() => navigate('/logout')}>
          <Icon name="angle double right" />
          Đăng xuất
        </Menu.Item>
      </Menu>
    </>
  );
};
