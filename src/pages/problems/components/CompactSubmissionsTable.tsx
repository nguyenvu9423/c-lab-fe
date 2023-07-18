import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { SubmissionDetailsLink, Submission } from '../../../domains/submission';
import { SubmissionStatusLabel } from '../../../domains/submission/components/SubmissionStatusLabel';

export namespace CompactSubmissionTable {
  export interface Props {
    submissions: Submission[];
  }
}

export const CompactSubmissionTable: React.FC<CompactSubmissionTable.Props> = (
  props
) => {
  const { submissions } = props;
  return (
    <Table basic="very" fixed singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="4">ID</Table.HeaderCell>
          <Table.HeaderCell width="12">Kết quả</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {submissions.map((submission) => {
          return (
            <Table.Row key={submission.id} style={{ height: 42 }}>
              <Table.Cell>
                <SubmissionDetailsLink submission={submission} />
              </Table.Cell>
              <Table.Cell>
                <SubmissionStatusLabel submission={submission} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
