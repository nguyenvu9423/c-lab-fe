import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SubmissionSelector, UserSelectors } from '../../store/selectors';
import { fetchSubmissions } from '../../store/actions/submission';
import { LoadingState } from '../../store/common';
import { useSubmissionStream } from '../submission/hooks';
import { Dimmer, Loader, Table, Pagination } from 'semantic-ui-react';
import { SubmissionStatusLabel } from '../submission/components/SubmissionStatusLabel';
import { SubmissionDetailsLink } from '../../domains/submission';
import { Link } from 'react-router-dom';
import { Target } from '../../store/reducers/target';
import { resetState } from '../../store/actions';
import { formatResourceTime, formatResourceMemory } from './utils';

const PAGE_SIZE = 10;

export function ProblemUserSubmissionsPage(props) {
  const { problem } = props;
  const loginUser = useSelector(UserSelectors.loginUser());
  const { data } = useSelector(state => state.problemUserSubmissions);
  const { loadingState, ids, totalPages, activePage } = data.submissions;
  const dispatch = useDispatch();

  const load = React.useCallback(
    ({ pageable } = {}) => {
      dispatch(
        fetchSubmissions.request(
          {
            userId: loginUser.id,
            problemId: problem.id,
            pageable: pageable ?? data.submissions.pageable
          },
          {
            target: Target.PROBLEM_USER_SUBMISSIONS
          }
        )
      );
    },
    [data]
  );

  React.useEffect(() => {
    return () =>
      dispatch(resetState({ target: Target.PROBLEM_USER_SUBMISSIONS }));
  }, []);

  React.useEffect(() => {
    load({ page: 0, size: PAGE_SIZE });
  }, []);

  const submissions = useSelector(SubmissionSelector.byIds(ids));

  useSubmissionStream(submissions);

  const handlePageChange = React.useCallback((event, { activePage }) => {
    dispatch(load({ pageable: { page: activePage - 1, size: PAGE_SIZE } }));
  }, []);

  return (
    <>
      <Dimmer active={loadingState === LoadingState.LOADING} inverted>
        <Loader />
      </Dimmer>

      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Người nộp</Table.HeaderCell>
            <Table.HeaderCell>Kết quả</Table.HeaderCell>
            <Table.HeaderCell>Thời gian</Table.HeaderCell>
            <Table.HeaderCell>Bộ nhớ</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {submissions.map(submission => {
            const { id, user, result } = submission;

            return (
              <Table.Row key={submission.id}>
                <Table.Cell>
                  <SubmissionDetailsLink submissionId={id} />
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/users/${user.username}`}>{user.username}</Link>
                </Table.Cell>
                <Table.Cell>
                  <SubmissionStatusLabel submission={submission} />
                </Table.Cell>
                <Table.Cell>
                  {formatResourceTime(result?.resource?.time)}
                </Table.Cell>
                <Table.Cell>
                  {formatResourceMemory(result?.resource?.memory)}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

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
