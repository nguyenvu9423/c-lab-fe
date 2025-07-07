import React from 'react';
import { Link } from 'react-router-dom';

export const ContestProblemPageLink: React.FC<{
  contestId: number;
  code: string;
  children?: React.ReactNode;
}> = ({ contestId, code, children }) => {
  return (
    <Link to={`/contests/${contestId}/problems/${code}`}>
      {children ?? code}
    </Link>
  );
};
