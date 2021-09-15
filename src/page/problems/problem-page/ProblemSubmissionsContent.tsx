import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import {
  LoadingIndicator,
  Pagination,
  TagContainer,
} from '../../../components';
import { useJudgesStream } from '../../../domains/judge';
import { Problem } from '../../../domains/problem';
import { Submission, SubmissionFilterCard } from '../../../domains/submission';
import { State } from '../../../store';
import { fetchSubmissions, resetState } from '../../../store/actions';
import { DataHolderState } from '../../../store/reducers/data-holders/shared';
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
        <Segment attached="bottom">
          <ProblemSubmissionTable
            problem={problem}
            query={
              query
                ? `${query}${LogicalOperator.AND}problem.code==${problem.code}`
                : undefined
            }
          />
        </Segment>
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
    query?: string;
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

  const currentPageable = DataHolderState.isLoadRequested(data.submissions)
    ? data.submissions.pageable
    : initialPageable;

  const load = React.useCallback(
    (params: { pageable?: Pageable } = {}) => {
      const pageable = params.pageable ?? currentPageable;
      const target = Target.ProblemPageContents.SUBMISSIONS;
      if (query) {
        dispatch(
          fetchSubmissions.request({
            type: 'byQuery',
            query,
            pageable,
            target,
          })
        );
      } else {
        dispatch(
          fetchSubmissions.request({
            type: 'byProblem',
            problemCode: problem.code,
            pageable,
            target,
          })
        );
      }
    },
    [dispatch, problem.code, query, currentPageable]
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

  if (DataHolderState.isLoading(data.submissions)) {
    return (
      <div style={{ minHeight: 150 }}>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
      <SubmissionsTable submissions={submissions ?? []} />
      <div style={{ textAlign: 'center' }}>
        <Pagination
          size={'tiny'}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          boundaryRange={0}
          activePage={currentPageable.page + 1}
          totalPages={data.submissions.totalPages ?? currentPageable.page + 1}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
