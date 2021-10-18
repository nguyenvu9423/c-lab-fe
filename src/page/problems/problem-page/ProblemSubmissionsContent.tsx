import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Grid, Header, Segment } from 'semantic-ui-react';
import { Pagination, TagContainer } from '../../../components';
import { useJudgesStream } from '../../../domains/judge';
import { Problem } from '../../../domains/problem';
import { Submission, SubmissionFilterCard } from '../../../domains/submission';
import { State } from '../../../store';
import { fetchSubmissions, resetState } from '../../../store/actions';
import {
  DataHolder,
  DataHolderState,
} from '../../../store/reducers/data-holders/shared';
import { Target } from '../../../store/reducers/target';
import { SubmissionSelectors } from '../../../store/selectors';
import { Pageable } from '../../../utility';
import { LogicalOperator } from '../../../utility/filter';
import { SubmissionsTable } from '../components';
import { ProblemNavMenu } from '../components/ProblemNavMenu';

export const ProblemSubmissionsContent: React.FC<{ problem: Problem }> = (
  props
) => {
  const { problem } = props;
  const [query, setQuery] = React.useState<string | undefined>();
  return (
    <>
      <Grid.Column width={12}>
        <ProblemNavMenu problem={problem} tabName="status" />
        <ProblemSubmissionTable
          problem={problem}
          query={
            query
              ? `${query}${LogicalOperator.AND}problem.code==${problem.code}`
              : `problem.code==${problem.code}`
          }
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <SubmissionFilterCard problem={problem} onQueryChange={setQuery} />
        <TagContainer ids={problem.tags} />
      </Grid.Column>
    </>
  );
};

export namespace ProblemSubmissionTable {
  export interface Props {
    problem: Problem;
    query: string;
  }
}

const PAGE_SIZE = 10;

const initialPageable: Pageable = {
  page: 0,
  size: PAGE_SIZE,
};

export const ProblemSubmissionTable: React.FC<ProblemSubmissionTable.Props> = (
  props
) => {
  const { problem, query } = props;
  const dispatch = useDispatch();
  const { data } = useSelector(
    (state: State) => state.problemPageContents.submissions
  );

  const pageable = DataHolder.usePageable(data.submissions, initialPageable);
  const totalPage = DataHolder.useTotalPages(data.submissions);

  const load = React.useCallback(
    (params?: { pageable?: Pageable }) => {
      dispatch(
        fetchSubmissions.request({
          type: 'byQuery',
          query,
          pageable: params?.pageable ?? pageable,
          target: Target.ProblemPageContents.SUBMISSIONS,
        })
      );
    },
    [dispatch, problem.code, query, pageable]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.ProblemPageContents.SUBMISSIONS }));
    };
  }, [query]);

  const handlePageChange = React.useCallback(
    (event, { activePage }) => {
      load({ pageable: { page: activePage - 1, size: PAGE_SIZE } });
    },
    [load]
  );

  const submissions = useSelector(
    DataHolderState.isLoaded(data.submissions)
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : () => undefined
  );

  useJudgesStream(
    submissions
      ? submissions
          .filter((sub): sub is Submission => sub !== undefined)
          .map((sub) => sub.judge)
      : []
  );

  return (
    <Segment.Group>
      <Segment style={{ height: 678, padding: 0 }}>
        <SubmissionsTable
          loading={DataHolder.isLoading(data.submissions)}
          errorMessage={
            DataHolder.isError(data.submissions)
              ? data.submissions.error.message
              : undefined
          }
          submissions={submissions}
        />
      </Segment>

      <Segment textAlign="center">
        <Pagination
          activePage={pageable.page + 1}
          totalPages={totalPage}
          onPageChange={handlePageChange}
        />
      </Segment>
    </Segment.Group>
  );
};
