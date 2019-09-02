import { Icon, Menu } from 'semantic-ui-react';
import * as React from 'react';
import { createRef } from 'react';
import UserService from '../../../service/UserService';
import { connect } from 'react-redux';
import { updateEntity } from '../../../action/entity';
import { userSchema } from '../../../entitySchema/userSchema';
import { normalize } from 'normalizr';
import { Link } from 'react-router-dom';

class BaseUserSettingMenu extends React.Component {
  constructor() {
    super();
    this.fileInputRef = createRef();
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
  }

  handleUploadAvatar(e) {
    const {
      target: { files }
    } = e;
    const { user, updateEntity } = this.props;
    if (files.length === 1 && user) {
      const avatar = files[0];
      const formData = new FormData();
      formData.set('avatar', avatar, avatar.name);
      UserService.updateAvatar(user.username, formData).then(res => {
        const response = res.data;
        const entities = normalize(response, userSchema).entities;
        updateEntity(entities);
      });
    }
  }

  render() {
    const { user } = this.props;
    return (
      <Menu vertical fluid>
        <Menu.Item
          name={'change-avatar'}
          link
          onClick={() => {
            this.fileInputRef.current.click();
          }}
        >
          Change avatar
          <Icon name={'user circle'} size={'large'} />
          <input
            type={'file'}
            id={'avatarFile'}
            hidden
            ref={this.fileInputRef}
            onChange={this.handleUploadAvatar}
          />
        </Menu.Item>
        <Menu.Item
          name={'update-info'}
          link
          as={Link}
          to={user ? `${user.username}/edit` : ''}
        >
          <Icon name={'info circle'} size={'large'} />
          Update info
        </Menu.Item>
        <Menu.Item
          link
          as={Link}
          to={user ? `${user.username}/change-password` : ''}
        >
          <Icon name="key" size="large" />
          Change password
        </Menu.Item>
        <Menu.Item name={'logout'} link>
          <Icon name={'sign-out'} size={'large'} />
          Log out
        </Menu.Item>
      </Menu>
    );
  }
}

export const UserSettingMenu = connect(
  null,
  { updateEntity: updateEntity }
)(BaseUserSettingMenu);
