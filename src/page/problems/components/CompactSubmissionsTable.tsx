import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { SubmissionDetailsLink, Submission } from '../../../domains/submission';
import { JudgeStatusLabel } from '../../../domains/judge';

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
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Kết quả</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {submissions.map((submission) => {
          return (
            <Table.Row key={submission.id}>
              <Table.Cell>
                <SubmissionDetailsLink submissionId={submission.id} />
              </Table.Cell>
              <Table.Cell>
                <JudgeStatusLabel judgeId={submission.judge} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
