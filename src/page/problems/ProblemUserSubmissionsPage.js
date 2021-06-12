import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SubmissionSelector, PrincipalSelectors } from '../../store/selectors';
import { fetchSubmissions } from '../../store/actions/submission';
import { LoadingState } from '../../store/common';
import { Dimmer, Loader, Pagination } from 'semantic-ui-react';
import { useJudgesStream } from '../../domains/judge';
import {} from '../../domains/submission';
import { Target } from '../../store/reducers/target';
import { resetState } from '../../store/actions';
import { SubmissionsTable } from './components/SubmissionsTable';

const PAGE_SIZE = 10;

export function ProblemUserSubmissionsPage(props) {
  const { problem } = props;
  const principal = useSelector(PrincipalSelectors.principal());
  if (principal) {
    return <UserSubmissionTable user={principal} problem={problem} />;
  } else {
    return <p>Please login to see the page</p>;
  }
}

function UserSubmissionTable(props) {
  const { problem, user } = props;
  const history = useHistory();

  const { data } = useSelector(state => state.problemUserSubmissions);

  const { loadingState, ids, totalPages } = data.submissions;

  const highlighSubId = history.location?.state?.highlightSubId;
  const dispatch = useDispatch();

  const load = React.useCallback(
    ({ pageable } = {}) => {
      dispatch(
        fetchSubmissions.request(
          {
            userId: user.id,
            problemId: problem.id,
            pageable: pageable ?? data.submissions.pageable
          },
          {
            target: Target.PROBLEM_USER_SUBMISSIONS
          }
        )
      );
    },
    [data, user]
  );

  React.useEffect(() => {
    load({ pageable: { page: 0, size: PAGE_SIZE } });
    return () =>
      dispatch(resetState({ target: Target.PROBLEM_USER_SUBMISSIONS }));
  }, []);

  const submissions = useSelector(SubmissionSelector.byIds(ids));

  useJudgesStream(submissions ? submissions.map(sub => sub.judge) : []);

  const handlePageChange = React.useCallback((event, { activePage }) => {
    dispatch(load({ pageable: { page: activePage - 1, size: PAGE_SIZE } }));
  }, []);

  return (
    <>
      <Dimmer active={loadingState === LoadingState.LOADING} inverted>
        <Loader />
      </Dimmer>
      <SubmissionsTable
        submissions={submissions}
        highlighSubId={highlighSubId}
      />
      <div style={{ textAlign: 'center' }}>
        <Pagination
          activePage={data.submissions.pageable.page + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
