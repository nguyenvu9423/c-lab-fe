import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SubmissionSelectors, PrincipalSelectors } from '../../store/selectors';
import { fetchSubmissions } from '../../store/actions/submission';
import { LoadingState } from '../../store/common';
import { Dimmer, Loader, Pagination } from 'semantic-ui-react';
import { useJudgesStream } from '../../domains/judge';
import { Target } from '../../store/reducers/target';
import { resetState } from '../../store/actions';
import { SubmissionsTable } from './components/SubmissionsTable';
import { Problem } from '../../domains/problem';
import { User } from '../../domains/user';
import { State } from '../../store';

const PAGE_SIZE = 10;

export const ProblemUserSubmissionsPage: React.FC<{ problem: Problem }> = (
  props
) => {
  const { problem } = props;
  const principal = useSelector(PrincipalSelectors.principal());
  if (principal) {
    return <UserSubmissionTable user={principal} problem={problem} />;
  } else {
    return <p>Please login to see the page</p>;
  }
};

export const UserSubmissionTable: React.FC<{ problem: Problem; user: User }> = (
  props
) => {
  const { problem, user } = props;
  const history = useHistory<{ highlightSubId: number }>();

  const { data } = useSelector((state: State) => state.userSubProblemPage);

  const highlightSubId = history.location.state?.highlightSubId;
  const dispatch = useDispatch();

  const load = React.useCallback(
    ({ pageable } = {}) => {
      dispatch(
        fetchSubmissions.request({
          type: 'byUserAndProblem',
          userId: user.id,
          problemId: problem.id,
          pageable: pageable ?? data.submissions.pageable,
          target: Target.PROBLEM_USER_SUBMISSIONS,
        })
      );
    },
    [data, user]
  );

  React.useEffect(() => {
    load({ pageable: { page: 0, size: PAGE_SIZE } });
    return () => {
      dispatch(resetState({ target: Target.PROBLEM_USER_SUBMISSIONS }));
    };
  }, []);

  const submissions = useSelector(
    data.submissions.loadingState === LoadingState.LOADED
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : () => undefined
  );

  useJudgesStream(submissions ? submissions.map((sub) => sub.judge) : []);

  const handlePageChange = React.useCallback((event, { activePage }) => {
    dispatch(load({ pageable: { page: activePage - 1, size: PAGE_SIZE } }));
  }, []);

  return (
    <>
      <Dimmer
        active={data.submissions.loadingState === LoadingState.LOADING}
        inverted
      >
        <Loader />
      </Dimmer>
      {data.submissions.loadingState === LoadingState.LOADED && (
        <>
          <SubmissionsTable
            submissions={submissions ?? []}
            highlightSubId={highlightSubId}
          />
          <div style={{ textAlign: 'center' }}>
            <Pagination
              activePage={data.submissions.pageable.page + 1}
              totalPages={data.submissions.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
};
