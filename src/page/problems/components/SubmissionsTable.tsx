import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { JudgeSelectors } from '../../../store/selectors/JudgeSelectors';
import { SubmissionDetailsLink, Submission } from '../../../domains/submission';
import { JudgeStatusLabel } from '../../../domains/judge';
import { formatResourceTime, formatResourceMemory } from '../utils';

export const SubmissionsTable: React.FC<{
  submissions: Submission[];
  highlightSubId?: number;
}> = (props) => {
  const { submissions, highlightSubId } = props;
  return (
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Người nộp</Table.HeaderCell>
          <Table.HeaderCell>Kết quả</Table.HeaderCell>
          <Table.HeaderCell>Thời gian</Table.HeaderCell>
          <Table.HeaderCell>Bộ nhớ</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {submissions.map((submission) => {
          return (
            <SubmissionRow
              key={submission.id}
              submission={submission}
              active={submission.id === highlightSubId}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};

function SubmissionRow({ submission, active }) {
  const { user } = submission;

  const judge = useSelector(JudgeSelectors.byId(submission.judge));

  const result = judge?.result;

  return (
    <Table.Row active={active}>
      <Table.Cell>
        <SubmissionDetailsLink submission={submission} />
      </Table.Cell>
      <Table.Cell>
        <Link to={`/users/${user.username}`}>{user.username}</Link>
      </Table.Cell>
      <Table.Cell>
        {judge && <JudgeStatusLabel judgeId={judge.id} />}
      </Table.Cell>
      <Table.Cell>{formatResourceTime(result?.resource?.time)}</Table.Cell>
      <Table.Cell>{formatResourceMemory(result?.resource?.memory)}</Table.Cell>
    </Table.Row>
  );
}
