import * as React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export function UserSettingMenu(props) {
  const { user } = props;
  return (
    <Menu vertical fluid>
      <Menu.Item
        name={'update-info'}
        link
        as={Link}
        to={user ? `${user.username}/edit` : ''}
      >
        <Icon name={'edit'} />
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
      <Menu.Item name={'logout'} link>
        <Icon name={'double angle right'} />
        Log out
      </Menu.Item>
    </Menu>
  );
}
