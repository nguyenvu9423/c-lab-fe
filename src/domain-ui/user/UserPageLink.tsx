import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserSelectors } from '@/store/selectors';

export namespace UserPageLink {
  export type Props = { username: string } | PropsWithId;

  export interface PropsWithId {
    userId: number;
  }
}

export const UserPageLink: React.FC<UserPageLink.Props> = (props) => {
  return 'username' in props ? (
    <Link to={`/users/${props.username}`}>{props.username}</Link>
  ) : (
    <UserPageLinkWithId userId={props.userId} />
  );
};

const UserPageLinkWithId: React.FC<UserPageLink.PropsWithId> = ({ userId }) => {
  const user = useSelector(UserSelectors.selectById(userId));
  return <Link to={`/users/${user.username}`}>{user.username}</Link>;
};
