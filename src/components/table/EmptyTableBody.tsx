import React from 'react';
import { Message, Table } from 'semantic-ui-react';

export namespace EmptyTableBody {
  export interface Props {
    icon?: string;

    content: string;
  }
}

export const EmptyTableBody: React.FC<EmptyTableBody.Props> = ({
  icon,
  content,
}) => {
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan="100%">
          <Message icon={icon ?? 'folder open outline'} content={content} />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};
