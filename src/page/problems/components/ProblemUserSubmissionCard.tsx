import * as React from 'react';
import { Header, Segment, Pagination, Dimmer, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions, resetState } from '../../../store/actions';
import { SubmissionSelectors } from '../../../store/selectors/SubmissionSelectors';
import { LoadingState } from '../../../store/common';
import { Target } from '../../../store/reducers/target';
import { CompactSubmissionTable } from './CompactSubmissionsTable';
import { useJudgesStream } from '../../../domains/judge';
import { State } from '../../../store/state';
import { Submission } from '../../../domains/submission';

export const PAGE_SIZE = 5;

export const ProblemUserSubmissionCard: React.FC<{
  problemId: number;
  userId: number;
}> = (props) => {
  const dispatch = useDispatch();

  const { problemId, userId } = props;
  const { data } = useSelector((state: State) => state.userProblemSubCard);

  const submissions = useSelector(
    data.submissions.loadingState === LoadingState.LOADED
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : () => undefined
  );

  const load = React.useCallback(
    ({ pageable } = {}) => {
      dispatch(
        fetchSubmissions.request({
          type: 'byUserAndProblem',
          problemId,
          userId,
          pageable: pageable ?? data.submissions.pageable,
          target: Target.USER_PROBLEM_SUB_CARD,
        })
      );
    },
    [userId, problemId, data.submissions?.pageable]
  );

  React.useEffect(() => {
    return () => {
      dispatch(resetState({ target: Target.PROBLEM_USER_SUBMISSIONS }));
    };
  }, []);

  React.useEffect(() => {
    load({ pageable: { page: 0, size: PAGE_SIZE } });
  }, []);

  useJudgesStream(
    submissions
      ? submissions
          .filter((sub): sub is Submission => {
            return sub !== undefined;
          })
          .map((sub) => sub.judge)
      : []
  );

  const handlePageChange = React.useCallback((event, { activePage }) => {
    load({ pageable: { page: activePage - 1, size: PAGE_SIZE } });
  }, []);

  return (
    <>
      <Header as="h3" attached="top">
        Bài đã nộp
      </Header>
      <Segment attached>
        {data.submissions.loadingState === LoadingState.LOADING && (
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        )}
        {data.submissions.loadingState === LoadingState.LOADED && submissions && (
          <>
            <CompactSubmissionTable submissions={submissions} />
            <div style={{ textAlign: 'center' }}>
              <Pagination
                size={'tiny'}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                boundaryRange={0}
                activePage={data.submissions.pageable.page + 1}
                totalPages={data.submissions.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </Segment>
    </>
  );
};
