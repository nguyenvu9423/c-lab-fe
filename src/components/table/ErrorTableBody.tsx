import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { ErrorMessage } from '..';

export const ErrorTableBody: React.FC<{ message?: string }> = (props) => {
  return (
    <Table.Body className="error-table-body">
      <Table.Row>
        <Table.Cell>
          <div className="error-message-container">
            <ErrorMessage message={props.message} />
          </div>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};
