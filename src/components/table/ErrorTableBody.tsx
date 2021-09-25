import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { ErrorMessage } from '..';

export const ErrorTableBody: React.FC<{ message?: string }> = (props) => {
  return (
    <Table.Body style={{ position: 'relative' }}>
      <Table.Row>
        <div
          style={{
            width: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        >
          <ErrorMessage message={props.message} />
        </div>
      </Table.Row>
    </Table.Body>
  );
};
