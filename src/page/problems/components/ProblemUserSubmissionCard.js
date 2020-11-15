import * as React from 'react';
import {
  Header,
  Segment,
  Table,
  Pagination,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions, resetState } from '../../../store/actions';
import { SubmissionStatusLabel } from '../../submission/components/SubmissionStatusLabel';
import { SubmissionSelector } from '../../../store/selectors/SubmissionSelectors';
import { LoadingState } from '../../../store/common';
import { useSubmissionStream } from '../../submission/hooks';
import { SubmissionDetailsLink } from '../../../domains/submission';
import { Target } from '../../../store/reducers/target';

export const PAGE_SIZE = 5;

export function ProblemUserSubmissionCard(props) {
  const { problem, userId } = props;
  const dispatch = useDispatch();
  const { data } = useSelector(state => state[Target.PROBLEM_USER_SUBMISSIONS]);
  const { loadingState, ids, totalPages, activePage } = data.submissions;

  React.useEffect(() => {
    return () =>
      dispatch(resetState({ target: Target.PROBLEM_USER_SUBMISSIONS }));
  }, []);

  React.useEffect(() => {
    if (loadingState === LoadingState.LOAD_NEEDED) {
      dispatch(
        fetchSubmissions.request(
          {
            userId,
            problemId: problem.id,
            pageable: {
              pageNumber: activePage,
              pageSize: PAGE_SIZE
            }
          },
          { target: Target.PROBLEM_USER_SUBMISSIONS }
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
          userId,
          problemId: problem.id,
          pageable: {
            pageNumber: activePage - 1,
            pageSize: PAGE_SIZE
          }
        },
        { target: Target.PROBLEM_USER_SUBMISSIONS }
      )
    );
  }, []);

  return (
    <>
      <Header as="h2" attached="top">
        Bài đã nộp
      </Header>
      <Segment attached>
        {loadingState === LoadingState.LOADING && (
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        )}
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Kết quả</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {submissions.map(submission => {
              return (
                <Table.Row key={submission.id}>
                  <Table.Cell>
                    <SubmissionDetailsLink submissionId={submission.id} />
                  </Table.Cell>
                  <Table.Cell>
                    <SubmissionStatusLabel submission={submission} />
                  </Table.Cell>
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
      </Segment>
    </>
  );
}
