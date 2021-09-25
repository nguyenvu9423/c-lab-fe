import * as React from 'react';
import {
  Pagination as SemanticPagination,
  PaginationProps,
} from 'semantic-ui-react';

export const Pagination: React.FC<PaginationProps> = (props) => {
  return <SemanticPagination ellipsisItem={null} {...props} />;
};
