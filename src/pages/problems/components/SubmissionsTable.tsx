import * as React from 'react';
import { Table, TableProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SubmissionDetailsLink } from '@/domain-ui/submission';

import { JudgeSelectors } from '@/store/selectors/JudgeSelectors';
import { JudgeStatusLabel } from '@/domain-ui/judge';
import { Submission } from '@/domains/submission';
import { formatResourceTime, formatResourceMemory } from '../utils';
import {
  EmptyTableBody,
  ErrorTableBody,
  LoadingTableBody,
} from '@/components/table';
import { DateTimeUtils } from '../../../utils/data-type/DateTimeUtils';

export namespace SubmissionsTable {
  export interface Props extends TableProps {
    loading?: boolean;
    errorMessage?: string;
    submissions?: Submission[];
    highlightSubId?: number;
  }
}

export const SubmissionsTable: React.FC<SubmissionsTable.Props> = (props) => {
  const { loading, errorMessage, submissions, highlightSubId, ...rest } = props;
  const hasSubmissions = submissions && submissions.length > 0;

  return (
    <Table basic fixed singleLine style={{ border: 'none' }} {...rest}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>ID</Table.HeaderCell>
          <Table.HeaderCell width={2} textAlign="center">
            Thông tin
          </Table.HeaderCell>
          <Table.HeaderCell width={3} textAlign="center">
            Người nộp
          </Table.HeaderCell>
          <Table.HeaderCell width={3} textAlign="center">
            Kết quả
          </Table.HeaderCell>
          <Table.HeaderCell width={2} textAlign="center">
            Tài nguyên
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {loading ? (
        <LoadingTableBody />
      ) : errorMessage ? (
        <ErrorTableBody message={errorMessage} />
      ) : hasSubmissions ? (
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
      ) : (
        <EmptyTableBody content="Chưa có bài nộp" />
      )}
    </Table>
  );
};

const SubmissionRow: React.FC<{ submission: Submission; active?: boolean }> = (
  props,
) => {
  const { active, submission } = props;
  const { user } = submission;

  const judge = useSelector(JudgeSelectors.byId(submission.judge));

  const result = judge?.result;

  return (
    <Table.Row active={active}>
      <Table.Cell>
        <SubmissionDetailsLink submission={submission} />
      </Table.Cell>
      <Table.Cell textAlign="center">
        {submission.language.title}
        <br />
        {DateTimeUtils.of(submission.submittedAt).fromNow()}
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Link to={`/users/${user.username}`}>{user.username}</Link>
      </Table.Cell>
      <Table.Cell textAlign="center">
        {judge && <JudgeStatusLabel judgeId={judge.id} />}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {formatResourceTime(result?.resource?.time)} /{' '}
        {formatResourceMemory(result?.resource?.memory)}
      </Table.Cell>
    </Table.Row>
  );
};
