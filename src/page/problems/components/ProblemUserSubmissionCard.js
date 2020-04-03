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
import { fetchSubmissionsByUserAndProblem } from '../../../store/actions/submission';
import { ProblemUserSubmissionsSelectors } from '../../../store/selectors';
import { SubmissionStatusLabel } from '../../submission/components/SubmissionStatusLabel';
import { SubmissionSelector } from '../../../store/selectors/SubmissionSelectors';
import { LoadingState } from '../../../store/common';
import { useSubmissionStream } from '../../submission/hooks';
import { requestModal } from '../../../store/actions/modal';
import { ModalMap } from '../../../components/modals';
import { SubmissionDetailsLink } from '../../../domains/submission/components';

const PAGE_SIZE = 5;
export function ProblemUserSubmissionCard(props) {
  const { problemId, userId } = props;
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
        fetchSubmissionsByUserAndProblem.request(userId, problemId, {
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
      fetchSubmissionsByUserAndProblem.request(userId, problemId, {
        pageNumber: activePage - 1,
        pageSize: PAGE_SIZE
      })
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
