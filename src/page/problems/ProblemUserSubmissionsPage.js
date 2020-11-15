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

const PAGE_SIZE = 10;

export function ProblemUserSubmissionsPage(props) {
  const { problem } = props;
  const loginUser = useSelector(UserSelectors.loginUser());
  const { data } = useSelector(state => state.problemUserSubmissions);
  const { loadingState, ids, totalPages, activePage } = data.submissions;
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () =>
      dispatch(resetState({ target: Target.PROBLEM_USER_SUBMISSIONS }));
  }, []);
  React.useEffect(() => {
    if (loadingState === LoadingState.LOAD_NEEDED) {
      dispatch(
        fetchSubmissions.request(
          {
            user: loginUser.id,
            problemId: problem.id,
            pageable: {
              pageNumber: activePage,
              pageSize: PAGE_SIZE
            }
          },
          {
            target: Target.PROBLEM_USER_SUBMISSIONS
          }
        )
      );
    }
  }, [loadingState]);
  const submissions = useSelector(SubmissionSelector.byIds(ids));
  useSubmissionStream(submissions);
  const handlePageChange = React.useCallback((event, { activePage }) => {
    dispatch(
      fetchSubmissions.request(
        {
          userId: loginUser.id,
          problemId: problem.id,
          pageable: {
            pageNumber: activePage - 1,
            pageSize: PAGE_SIZE
          }
        },
        {
          target: Target.PROBLEM_USER_SUBMISSIONS
        }
      )
    );
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
                <Table.Cell>{result?.time} ms</Table.Cell>
                <Table.Cell>{result?.memory} mb</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <div style={{ textAlign: 'center' }}>
        <Pagination
          activePage={activePage + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
