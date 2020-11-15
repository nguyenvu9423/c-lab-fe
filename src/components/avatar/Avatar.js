import * as React from 'react';
import { Image } from 'semantic-ui-react';
import AvatarPlaceholderImg from '../../../public/images/avatar-placeholder.png';
import { serverPath } from '../../server';

export function Avatar(props) {
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
        ...style
      }}
      src={
        user.avatarUrl
          ? serverPath.resolve(user.avatarUrl)
          : AvatarPlaceholderImg
      }
    />
  );
}
