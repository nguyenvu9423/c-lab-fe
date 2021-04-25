import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { SubmissionDetailsLink } from '../../../domains/submission';
import { SubmissionStatusLabel } from '../../submission/components';

export function CompactSubmissionTable(props) {
  const { submissions } = props;
  return (
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Kết quả</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {submissions.map(submission => {
          return (
            <Table.Row key={submission.id}>
              <Table.Cell>
                <SubmissionDetailsLink submissionId={submission.id} />
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
}
