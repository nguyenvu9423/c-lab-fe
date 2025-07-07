import React, { useCallback, useEffect } from 'react';
import { Grid, Message, Segment, Table } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  JudgeSelectors,
  PrincipalSelectors,
  SubmissionSelectors,
} from '@/store/selectors';
import { State } from '@/store/state';
import { fetchContestSubmissions, resetState } from '@/store/actions';
import { Target } from '@/store/reducers/target';
import { LoadingState } from '@/store/common';
import { Contest } from '@/domains/contest';
import { SubmissionDetailsLink } from '@/domain-ui/submission';
import { ErrorTableBody, LoadingTableBody } from '@/components/table';
import { DateTimeUtils } from '@/utils/data-type/DateTimeUtils';
import { JudgeStatusLabel, useJudgesStream } from '@/domain-ui/judge';
import { Submission } from '@/domains/submission';
import { Pagination } from '@/components/index';
import { DataHolder } from '@/store/reducers/data-holders/shared';

import { EmptyTableBody } from '../../components/table/EmptyTableBody';
import { formatResourceMemory, formatResourceTime } from '../problems/utils';
import { ContestInfoCard } from './components';
import { PageUtils } from '../shared';
import { BaseContestContentProps } from './shared';

export namespace PrincipalContestSubContent {
  export interface Props extends BaseContestContentProps {}
}

const PAGE_SIZE = 10;

export const PrincipalProblemSubsContent: React.FC<
  PrincipalContestSubContent.Props
> = (props) => {
  const { contest, nav } = props;

  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const principal = useSelector(PrincipalSelectors.principal());
  const { data } = useSelector(
    (state: State) => state.contestPageContents.principalSubmissions,
  );

  const load = useCallback(() => {
    if (!principal) return;

    dispatch(
      fetchContestSubmissions.request({
        type: 'byUser',
        contestId: contest.id,
        username: principal.username,
        pageable: { page, size: PAGE_SIZE },
        target: Target.ContestPageContents.PRINCIPAL_SUBMISSIONS,
      }),
    );
  }, [dispatch, principal, page, contest.id]);

  useEffect(() => {
    load();
    return () => {
      dispatch(
        resetState({
          target: Target.ProblemPageContents.PRINCIPAL_SUBMISSIONS,
        }),
      );
    };
  }, [load, dispatch]);

  const submissions = useSelector(
    data.submissions.loadingState === LoadingState.LOADED
      ? SubmissionSelectors.byIds(data.submissions.results)
      : () => [],
  );

  const loadTotalPages = DataHolder.useTotalPages(data.submissions);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);

  useJudgesStream(submissions ? submissions.map((sub) => sub.judge) : []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          {nav}
          {principal ? (
            <ContestSubmissionTable
              contest={contest}
              submissions={submissions}
              activePage={page}
              totalPages={totalPages}
              onPageChange={(activePage) => setPage(activePage)}
            />
          ) : (
            <Message warning>Vui lòng đăng nhập để truy cập</Message>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <ContestInfoCard contest={contest} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const ContestSubmissionTable: React.FC<{
  contest: Contest;
  submissions: Submission[];
  loading?: boolean;
  errorMessage?: string;
  highlightSubId?: number;
  activePage: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}> = (props) => {
  const {
    contest,
    loading,
    errorMessage,
    submissions,
    highlightSubId,
    activePage,
    totalPages,
    onPageChange,
  } = props;

  return (
    <Segment.Group>
      <Segment textAlign="center" style={{ minHeight: 678, padding: 0 }}>
        <Table basic fixed singleLine style={{ border: 'none' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>ID</Table.HeaderCell>
              <Table.HeaderCell width={2} textAlign="center">
                Thông tin
              </Table.HeaderCell>
              <Table.HeaderCell width={2} textAlign="center">
                Bài
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
          ) : submissions && submissions.length > 0 ? (
            <Table.Body>
              {submissions.map((submission) => {
                return (
                  <ContestSubmissionRow
                    key={submission.id}
                    contest={contest}
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
      </Segment>
      <Segment textAlign="center">
        <Pagination
          activePage={activePage}
          totalPages={totalPages || 0}
          onPageChange={(_event, data) => {
            if (data.activePage) onPageChange?.(Number(data.activePage));
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

const ContestSubmissionRow: React.FC<{
  contest: Contest;
  submission: Submission;
  active?: boolean;
}> = (props) => {
  const { contest, active, submission } = props;
  const judge = useSelector(JudgeSelectors.byId(submission.judge));

  const result = judge?.result;

  const problemConfig = contest.judgeConfig?.problemConfigs.find(
    (config) => config.problem === submission.problem.id,
  );

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
        <Link to={`/contests/${contest.id}/problems/${problemConfig?.code}`}>
          {problemConfig?.code}
        </Link>
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
