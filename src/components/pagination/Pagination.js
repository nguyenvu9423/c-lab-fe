import * as React from 'react';
import { Pagination as SemanticPagination } from 'semantic-ui-react';

export function Pagination(props) {
  return <SemanticPagination ellipsisItem={null} {...props} />;
}
