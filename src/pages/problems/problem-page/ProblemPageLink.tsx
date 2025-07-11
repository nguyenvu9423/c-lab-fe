import React from 'react';
import { Link } from 'react-router-dom';

export const ProblemPageLink: React.FC<{
  code: string;
  children?: React.ReactNode;
}> = (props) => {
  return (
    <Link to={`/problems/${props.code}`}>{props.children ?? props.code}</Link>
  );
};
