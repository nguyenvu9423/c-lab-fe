import * as React from 'react';
import { Table, Pagination, Loader, Dimmer } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissionsByProblem } from '../../store/actions/submission';
import { ProblemSubmissionsSelector } from '../../store/selectors/ProblemSubmissionsSelectors';
import { SubmissionSelector } from '../../store/selectors/SubmissionSelectors';
import { SubmissionStatusLabel } from '../submission/components/SubmissionStatusLabel';
import { Link } from 'react-router-dom';
import { useSubmissionStream } from '../submission/hooks';
import { SubmissionDetailsLink } from '../../domains/submission/components';
import { SubmissionFilterSelectors } from '../../store/selectors';

export function ProblemStatusPage(props) {
  const { problemId } = props;
  const dispatch = useDispatch();
  const { filters } = useSelector(SubmissionFilterSelectors.state());
  React.useEffect(() => {
    dispatch(fetchSubmissionsByProblem.request(problemId, filters));
  }, [filters]);

  const handlePageChange = React.useCallback(
    (event, { activePage }) => {
      dispatch(
        fetchSubmissionsByProblem.request(problemId, filters, {
          pageNumber: activePage - 1
        })
      );
    },
    [filters]
  );

  const state = useSelector(ProblemSubmissionsSelector.state());
  const {
    submissions: submissionIds,
    isFetching,
    totalPages,
    activePage
  } = state;
  const submissions = useSelector(SubmissionSelector.byIds(submissionIds));
  useSubmissionStream(submissions);
  return (
    <>
      <Dimmer active={isFetching} inverted>
        <Loader />
      </Dimmer>

      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Bài</Table.HeaderCell>
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
                  <Link>{targetProblem.code}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Link>{submittingUser.username}</Link>
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
