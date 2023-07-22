import * as React from 'react';
import { Image } from 'semantic-ui-react';
import AvatarPlaceholderImg from '../../../public/images/avatar-placeholder.png';
import { BackEndConfig } from '../../config';
import { User } from '@/domains/user';

export namespace Avatar {
  export interface Props {
    user: User;
    style?: React.CSSProperties;
  }
}

export const Avatar: React.FC<Avatar.Props> = (props) => {
  const { user, style } = props;
  return (
    <Image
      className="avatar"
      circular
      bordered
      style={style}
      src={
        user?.avatarUrl
          ? `${BackEndConfig.API_URL}${user.avatarUrl}`
          : AvatarPlaceholderImg
      }
    />
  );
};
