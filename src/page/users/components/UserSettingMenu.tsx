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
        Update info
      </Menu.Item>
      <Menu.Item
        link
        as={Link}
        to={user ? `${user.username}/change-password` : ''}
      >
        <Icon name="lock" />
        Change password
      </Menu.Item>
      <Menu.Item name="logout" link onClick={() => history.push('/logout')}>
        <Icon name="angle double right" />
        Log out
      </Menu.Item>
    </Menu>
  );
};
