import * as React from 'react';
import { Header, Segment, Pagination, Dimmer, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions, resetState } from '../../../store/actions';
import { SubmissionSelector } from '../../../store/selectors/SubmissionSelectors';
import { LoadingState } from '../../../store/common';
import { useSubmissionStream } from '../../submission/hooks';
import { Target } from '../../../store/reducers/target';
import { CompactSubmissionTable } from './CompactSubmissionsTable';

export const PAGE_SIZE = 5;

export function ProblemUserSubmissionCard(props) {
  const dispatch = useDispatch();

  const { problemId, userId } = props;
  const { data } = useSelector(state => state[Target.PROBLEM_USER_SUBMISSIONS]);
  const submissions = useSelector(
    SubmissionSelector.byIds(data.submissions.ids)
  );

  const load = React.useCallback(
    ({ pageable } = {}) => {
      dispatch(
        fetchSubmissions.request(
          {
            problemId,
            userId,
            pageable: pageable ?? data.submissions.pageable
          },
          { target: Target.PROBLEM_USER_SUBMISSIONS }
        )
      );
    },
    [userId, problemId, data.submissions.pageable]
  );

  React.useEffect(() => {
    return () =>
      dispatch(resetState({ target: Target.PROBLEM_USER_SUBMISSIONS }));
  }, []);

  React.useEffect(() => {
    load({ pageable: { page: 0, size: PAGE_SIZE } });
  }, []);

  useSubmissionStream(submissions);
  const handlePageChange = React.useCallback((event, { activePage }) => {
    load({ pageable: { page: activePage - 1, size: PAGE_SIZE } });
  }, []);

  return (
    <>
      <Header as="h2" attached="top">
        Bài đã nộp
      </Header>
      <Segment attached>
        {data.submissions.loadingState === LoadingState.LOADING && (
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        )}
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
      </Segment>
    </>
  );
}
