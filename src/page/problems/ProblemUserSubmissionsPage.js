import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  problemUser,
  SubmissionSelector,
  UserSelectors,
  ProblemUserSubmissionsSelectors
} from '../../store/selectors';
import { fetchSubmissionsByUserAndProblem } from '../../store/actions/submission';
import { LoadingState } from '../../store/common';
import { useSubmissionStream } from '../submission/hooks';
import { Dimmer, Loader, Table, Pagination } from 'semantic-ui-react';
import { SubmissionStatusLabel } from '../submission/components/SubmissionStatusLabel';
import { SubmissionDetailsLink } from '../../domains/submission/components';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 10;

export function ProblemUserSubmissionsPage(props) {
  const { problemId } = props;
  const loginUser = useSelector(UserSelectors.loginUser());
  const {
    loadingState,
    submissions: submissionIds,
    totalPages,
    activePage
  } = useSelector(ProblemUserSubmissionsSelectors.state());
  const dispatch = useDispatch();
  React.useEffect(() => {
    // return () => dispatch(userSubmissionToProblem.resetState());
  }, []);
  React.useEffect(() => {
    if (loadingState === LoadingState.LOAD_NEEDED) {
      dispatch(
        fetchSubmissionsByUserAndProblem.request(loginUser.id, problemId, {
          pageNumber: activePage,
          pageSize: PAGE_SIZE
        })
      );
    }
  }, [loadingState]);
  const submissions = useSelector(SubmissionSelector.byIds(submissionIds));
  useSubmissionStream(submissions);
  const handlePageChange = React.useCallback((event, { activePage }) => {
    dispatch(
      fetchSubmissionsByUserAndProblem.request(loginUser.id, problemId, {
        pageNumber: activePage - 1,
        pageSize: PAGE_SIZE
      })
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
            const { id, targetProblem, submittingUser, result } = submission;
            return (
              <Table.Row key={submission.id}>
                <Table.Cell>
                  <SubmissionDetailsLink submissionId={id} />
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/users/${submittingUser.username}`}>
                    {submittingUser.username}
                  </Link>
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
          size={'tiny'}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          boundaryRange={0}
          activePage={activePage + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
