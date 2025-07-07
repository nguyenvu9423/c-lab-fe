import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Pagination, Segment, Table } from 'semantic-ui-react';
import { BaseContestContentProps } from './shared';
import { ContestInfoCard } from './components';
import {
  Contest,
  ContestJudgeType,
  ContestSubmission,
} from '@/domains/contest';
import { ErrorTableBody, LoadingTableBody } from '@/components/table';
import {
  JudgeSelectors,
  ProblemSelectors,
  ContestSubmissionSelectors,
} from '@/store/selectors';
import { SubmissionDetailsLink } from '@/domain-ui/submission';
import { DateTimeUtils } from '@/utils/data-type/DateTimeUtils';
import { JudgeStatusLabel } from '@/domain-ui/judge';
import { fetchContestSubmissions, resetState } from '@/store/actions';
import { State } from '@/store/state';
import { Target } from '@/store/reducers/target';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { LoadingState } from '@/store/common';
import { PageUtils } from '../shared';
import { AcmFilterForm } from '@/domain-ui/submission/components/filter/AcmFilterForm';
import { OIFilterForm } from '@/domain-ui/submission/components/filter/OIFilterForm';
import { ExpressionNode } from '@rsql/ast';
import { RsqlUtils } from '@/utils/rsql';
import { VerdictFilterTypes } from '@/domain-ui/submission/components/filter/options';
import { formatResourceMemory, formatResourceTime } from '../problems/utils';
import { EmptyTableBody } from '../../components/table/EmptyTableBody';

export namespace ContestSubmissionContent {
  export interface Props extends BaseContestContentProps {}
}

const PAGE_SIZE = 10;

export const ContestSubmissionContent: React.FC<
  ContestSubmissionContent.Props
> = (props) => {
  const { contest, nav } = props;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  const { data } = useSelector(
    (state: State) => state.contestPageContents.submissions,
  );

  const load = React.useCallback(() => {
    dispatch(
      fetchContestSubmissions.request({
        type: 'byQuery',
        contestId: contest.id,
        query,
        pageable: { page, size: PAGE_SIZE },
      }),
    );
  }, [dispatch, query, contest.id, page]);

  useEffect(() => {
    load();
  }, [load, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(
        resetState({
          target: Target.ContestPageContents.SUBMISSIONS,
        }),
      );
    };
  }, [dispatch]);

  const submissions = useSelector(
    data.submissions.loadingState === LoadingState.LOADED
      ? ContestSubmissionSelectors.byIds(data.submissions.results)
      : () => [],
  );

  const loadTotalPages = DataHolder.useTotalPages(data.submissions);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          {nav}
          <ContestSubmissionTable
            contest={contest}
            submissions={submissions}
            activePage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <ContestInfoCard contest={contest} />
          <ContestSubmissionFilterCard
            contest={contest}
            onQueryChange={(query) => setQuery(query ?? '')}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export const ContestSubmissionFilterCard: React.FC<{
  contest: Contest;
  onQueryChange?(query: string | undefined): void;
}> = (props) => {
  const { contest, onQueryChange } = props;
  const { judgeConfig } = contest;
  const problemConfigs = judgeConfig?.problemConfigs ?? [];

  const problemOptions = useSelector((state: State) => [
    {
      value: undefined,
      text: '',
    },
    ...problemConfigs.map<{
      value: string | undefined;
      text: string;
    }>((problemConfig) => {
      const problem = ProblemSelectors.byId(problemConfig.problem)(state);
      return {
        key: problem.code,
        value: problem.code,
        text: `${problemConfig.code} - ${problem.title}`,
      };
    }),
  ]);

  const handleSubmit = React.useCallback(
    (values: AcmFilterForm.Value | OIFilterForm.Value) => {
      const predicates: ExpressionNode[] = [];

      if (values.problem) {
        predicates.push(RsqlUtils.Builder.eq('problem.code', values.problem));
      }

      if (values.language) {
        predicates.push(RsqlUtils.Builder.eq('language', values.language));
      }

      if (values.verdict) {
        const filterProps = VerdictFilterTypes.getProperties(values.verdict);
        if (filterProps.rsqlNode) {
          predicates.push(filterProps.rsqlNode);
        }
      }

      if ('score' in values && values.score) {
        const { operator, value } = values.score;
        predicates.push(
          RsqlUtils.Builder.comparison(
            'judge.result.score',
            operator,
            Number(value) / 100,
          ),
        );
      }

      if ('passedTestCount' in values && values.passedTestCount) {
        const { operator, value } = values.passedTestCount;
        predicates.push(
          RsqlUtils.Builder.comparison(
            'judge.result.passedTestCount',
            operator,
            value,
          ),
        );
      }

      const query =
        predicates.length > 0
          ? RsqlUtils.emit(RsqlUtils.Builder.and(...predicates))
          : undefined;

      onQueryChange?.(query ? query : undefined);
    },
    [onQueryChange],
  );

  if (!judgeConfig) return null;

  return (
    <>
      <Header as="h3" attached="top">
        Lọc
      </Header>
      <Segment attached="bottom" clearing>
        {judgeConfig.type === ContestJudgeType.ACM ? (
          <AcmFilterForm
            problemOptions={problemOptions}
            onSubmit={handleSubmit}
          />
        ) : (
          <OIFilterForm
            problemOptions={problemOptions}
            onSubmit={() => onQueryChange?.('')}
          />
        )}
      </Segment>
    </>
  );
};

export const ContestSubmissionTable: React.FC<{
  contest: Contest;
  submissions: ContestSubmission[];
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
          ) : submissions && submissions.length > 0 ? (
            <Table.Body>
              {submissions?.map((submission) => (
                <ContestSubmissionRow
                  key={submission.id}
                  contest={contest}
                  submission={submission}
                  active={submission.id === highlightSubId}
                />
              ))}
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
  submission: ContestSubmission;
  active?: boolean;
}> = (props) => {
  const { contest, active, submission } = props;
  const { user } = submission;
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
