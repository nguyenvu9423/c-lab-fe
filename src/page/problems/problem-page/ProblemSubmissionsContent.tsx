import * as React from 'react';
import { AND } from '@rsql/ast';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Segment, Ref } from 'semantic-ui-react';

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
import { scrollToElementTop } from '../../../utility';
import { PageUtils } from '../../shared';
import { ProblemInfoCard, SubmissionsTable } from '../components';
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
              ? `${query}${AND}problem.code==${problem.code}`
              : `problem.code==${problem.code}`
          }
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <ProblemInfoCard problem={problem} />
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

export const ProblemSubmissionTable: React.FC<ProblemSubmissionTable.Props> = (
  props
) => {
  const { query } = props;
  const [page, setPage] = React.useState(1);

  const dispatch = useDispatch();
  const { data } = useSelector(
    (state: State) => state.problemPageContents.submissions
  );

  const loadTotalPages = DataHolder.useTotalPages(data.submissions);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);

  PageUtils.useCorrectPageListener(page, totalPages, setPage);

  const load = React.useCallback(() => {
    dispatch(
      fetchSubmissions.request({
        type: 'byQuery',
        query,
        target: Target.ProblemPageContents.SUBMISSIONS,
        pageable: { page, size: PAGE_SIZE },
      })
    );
  }, [dispatch, query, page]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.ProblemPageContents.SUBMISSIONS }));
    };
  }, [load, dispatch]);

  const tableRef = React.useRef<HTMLElement>(null);

  const handlePageChange = React.useCallback(
    (event, { activePage }) => {
      setPage(activePage);
      if (tableRef.current) {
        scrollToElementTop(tableRef.current);
      }
    },
    [setPage]
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
      <Segment style={{ minHeight: 678, padding: 0 }}>
        <Ref innerRef={tableRef}>
          <SubmissionsTable
            loading={DataHolder.isLoading(data.submissions)}
            errorMessage={
              DataHolder.isError(data.submissions)
                ? data.submissions.error.message
                : undefined
            }
            submissions={submissions}
          />
        </Ref>
      </Segment>

      <Segment textAlign="center">
        <Pagination
          activePage={page}
          totalPages={totalPages || 0}
          onPageChange={handlePageChange}
        />
      </Segment>
    </Segment.Group>
  );
};
