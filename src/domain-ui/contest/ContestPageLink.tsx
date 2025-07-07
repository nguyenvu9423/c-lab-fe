import React from 'react';
import { Link } from 'react-router-dom';

export interface ContestPageLinkProps extends React.PropsWithChildren {
  id: number;
}

export const ContestPageLink: React.FC<ContestPageLinkProps> = (props) => {
  return (
    <Link
      to={`/contests/${props.id}`}
      onClick={(event) => event.stopPropagation()}
    >
      {props.children}
    </Link>
  );
};
