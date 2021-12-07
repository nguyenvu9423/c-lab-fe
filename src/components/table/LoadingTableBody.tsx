import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { LoadingIndicator } from '..';

export const LoadingTableBody: React.FC<{ height?: number }> = (props) => {
  return (
    <Table.Body className="loading-table-body">
      <Table.Row>
        <Table.Cell>
          <div className="loader-container" style={{ height: props.height }}>
            <LoadingIndicator />
          </div>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};
