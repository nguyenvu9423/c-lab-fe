import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { LoadingIndicator } from '..';

export const LoadingTableBody: React.FC<{ height?: number }> = (props) => {
  return (
    <Table.Body style={{ position: 'relative' }}>
      <Table.Row>
        <Table.Cell>
          <div
            style={{
              height: props.height ?? 168,
              position: 'absolute',
              left: 0,
              right: 0,
            }}
          >
            <LoadingIndicator />
          </div>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};
