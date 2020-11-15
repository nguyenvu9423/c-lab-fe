import * as React from 'react';
import { Table, Pagination } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions } from '../../store/actions/submission';
import { SubmissionSelector } from '../../store/selectors/SubmissionSelectors';
import { SubmissionStatusLabel } from '../submission/components/SubmissionStatusLabel';
import { Link } from 'react-router-dom';
import { useSubmissionStream } from '../submission/hooks';
import { SubmissionDetailsLink } from '../../domains/submission';
import { Target } from '../../store/reducers/target';
import { LoadingState } from '../../store/common';
import { LoadingIndicator } from '../../components/loading-indicator';

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
  useSubmissionStream(submissions);

  if (loadingState === LoadingState.LOADING) {
    return (
      <div style={{ minHeight: 150 }}>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
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
