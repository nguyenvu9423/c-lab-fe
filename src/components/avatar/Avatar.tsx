import * as React from 'react';
import { Image } from 'semantic-ui-react';
// @ts-ignore
import AvatarPlaceholderImg from '../../../public/images/avatar-placeholder.png';
import { serverPath } from '../../server';
import { User } from '../../domains/user';

export const Avatar: React.FC<{ user: User; style?: any }> = (props) => {
  const { user, style } = props;
  return (
    <Image
      circular
      bordered
      style={{
        objectFit: 'cover',
        width: 128,
        height: 128,
        display: 'inline-block',
        ...style,
      }}
      src={
        user?.avatarUrl
          ? serverPath.resolve(user.avatarUrl)
          : AvatarPlaceholderImg
      }
    />
  );
};
