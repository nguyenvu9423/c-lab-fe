import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserSelectors } from '../../store/selectors';

export const UserPageLink: React.FC<{ userId: number }> = ({ userId }) => {
  const user = useSelector(UserSelectors.selectById(userId));
  return <Link to={`/users/${user.username}`}>{user.username}</Link>;
};
