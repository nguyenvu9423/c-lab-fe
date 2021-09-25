import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { JudgeSelectors } from '../../../store/selectors/JudgeSelectors';
import { SubmissionDetailsLink, Submission } from '../../../domains/submission';
import { JudgeStatusLabel } from '../../../domains/judge';
import { formatResourceTime, formatResourceMemory } from '../utils';
import * as moment from 'moment';
import { DateTimeFormat } from '../../../config';
import { ErrorTableBody, LoadingTableBody } from '../../../components/table';

export const SubmissionsTable: React.FC<{
  loading?: boolean;
  errorMessage?: string;
  submissions?: Submission[];
  highlightSubId?: number;
  style?: React.CSSProperties;
}> = (props) => {
  const { loading, errorMessage, submissions, highlightSubId } = props;
  return (
    <Table basic fixed singleLine style={{ border: 'none' }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>ID</Table.HeaderCell>
          <Table.HeaderCell width={3}>Submitted at</Table.HeaderCell>
          <Table.HeaderCell width={3}>User</Table.HeaderCell>
          <Table.HeaderCell width={5}>Result</Table.HeaderCell>
          <Table.HeaderCell width={2}>Time</Table.HeaderCell>
          <Table.HeaderCell width={2}>Mem</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {loading ? (
        <LoadingTableBody />
      ) : errorMessage ? (
        <ErrorTableBody message={errorMessage} />
      ) : (
        submissions?.map((submission) => {
          return (
            <SubmissionRow
              key={submission.id}
              submission={submission}
              active={submission.id === highlightSubId}
            />
          );
        })
      )}
    </Table>
  );
};

const SubmissionRow: React.FC<{ submission: Submission; active?: boolean }> = ({
  submission,
  active,
}) => {
  const { user } = submission;

  const judge = useSelector(JudgeSelectors.byId(submission.judge));

  const result = judge?.result;

  return (
    <Table.Row active={active}>
      <Table.Cell>
        <SubmissionDetailsLink submission={submission} />
      </Table.Cell>
      <Table.Cell>
        {moment(submission.submittedAt).format(DateTimeFormat.Short)}
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
};
