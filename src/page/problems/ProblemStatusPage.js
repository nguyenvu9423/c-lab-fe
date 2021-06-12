import * as React from 'react';
import { Pagination } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions } from '../../store/actions/submission';
import { SubmissionSelector } from '../../store/selectors/SubmissionSelectors';
import { useSubmissionStream } from '../submission/hooks';
import { Target } from '../../store/reducers/target';
import { LoadingState } from '../../store/common';
import { LoadingIndicator } from '../../components/loading-indicator';
import { SubmissionsTable } from './components/SubmissionsTable';
import { useJudgesStream } from '../../domains/judge';

const PAGE_SIZE = 10;

export function ProblemStatusPage(props) {
  const { problem, query } = props;
  const dispatch = useDispatch();
  const { data } = useSelector(state => state[Target.PROBLEM_SUBMISSIONS]);

  const load = React.useCallback(
    ({ pageable } = {}) => {
      dispatch(
        fetchSubmissions.request(
          {
            problemId: problem.id,
            query,
            pageable: pageable ? pageable : data.submissions.pageable
          },
          { target: Target.PROBLEM_SUBMISSIONS }
        )
      );
    },
    [data, problem, query]
  );

  React.useEffect(() => {
    load({ pageable: { page: 0, size: PAGE_SIZE } });
  }, [query]);

  const handlePageChange = React.useCallback((event, { activePage }) => {
    load({ pageable: { page: activePage - 1, size: PAGE_SIZE } });
  }, []);

  const { ids, loadingState, totalPages, pageable } = data.submissions;

  const submissions = useSelector(SubmissionSelector.byIds(ids));
  useJudgesStream(submissions ? submissions.map(sub => sub.judge) : []);

  if (loadingState === LoadingState.LOADING) {
    return (
      <div style={{ minHeight: 150 }}>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
      <SubmissionsTable submissions={submissions} />
      <div style={{ textAlign: 'center' }}>
        <Pagination
          size={'tiny'}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          boundaryRange={0}
          activePage={pageable.page + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
