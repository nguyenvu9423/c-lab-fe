import * as React from 'react';
import { Header, Segment, Pagination, Table, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions, resetState } from '../../../store/actions';
import { SubmissionSelectors } from '../../../store/selectors/SubmissionSelectors';
import { Target } from '../../../store/reducers/target';

import { useJudgesStream } from '../../../domains/judge';
import { State } from '../../../store/state';
import {
  Submission,
  SubmissionDetailsLink,
  SubmissionStatusLabel,
} from '../../../domains/submission';
import {
  DataHolder,
  DataHolderState,
} from '../../../store/reducers/data-holders/shared';
import { Pageable } from '../../../utility';
import { ErrorTableBody, LoadingTableBody } from '../../../components/table';

export const PAGE_SIZE = 4;

const initialPageable: Pageable = {
  page: 0,
  size: PAGE_SIZE,
};

export namespace PrincipalProblemSubsCard {
  export interface Props {
    problemCode: string;
    userId: number;
  }

  export interface Ref {
    reload: () => void;
  }
}

export const PrincipalProblemSubsCard: React.FC<
  PrincipalProblemSubsCard.Props &
    React.RefAttributes<PrincipalProblemSubsCard.Ref>
> = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const { problemCode, userId } = props;
  const { data } = useSelector(
    (state: State) => state.principalProblemSubsCard
  );

  const submissions = useSelector(
    DataHolderState.isLoaded(data.submissions)
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : () => undefined
  );
  const pageable = DataHolder.usePageable(data.submissions, initialPageable);
  const totalPages = DataHolder.useTotalPages(data.submissions);

  const load = React.useCallback(
    (params?: { pageable?: Pageable }) => {
      dispatch(
        fetchSubmissions.request({
          type: 'byUserAndProblem',
          problemCode,
          userId,
          pageable: params?.pageable ?? pageable,
          target: Target.PRINCIPAL_PROBLEM_SUBS_CARD,
        })
      );
    },
    [dispatch, userId, problemCode, pageable]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.PRINCIPAL_PROBLEM_SUBS_CARD }));
    };
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

  const handlePageChange = React.useCallback(
    (event, { activePage }) => {
      load({ pageable: { page: activePage - 1, size: PAGE_SIZE } });
    },
    [load]
  );

  React.useImperativeHandle(
    ref,
    () => ({
      reload: load,
    }),
    [load]
  );

  return (
    <>
      <Header as="h3" attached="top">
        Bài đã nộp
      </Header>
      {submissions?.length !== 0 ? (
        <>
          <Segment style={{ height: 230, paddingTop: 0 }} attached>
            <Table basic fixed singleLine style={{ border: 0 }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width="1">ID</Table.HeaderCell>
                  <Table.HeaderCell width="4" textAlign="center">
                    Kết quả
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {DataHolder.isLoading(data.submissions) && <LoadingTableBody />}
              {DataHolder.isLoaded(data.submissions) && submissions && (
                <Table.Body>
                  {submissions.map((submission) => {
                    return (
                      <Table.Row key={submission.id} style={{ height: 42 }}>
                        <Table.Cell>
                          <SubmissionDetailsLink submission={submission} />
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <SubmissionStatusLabel
                            submission={submission}
                            compact
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              )}
              {DataHolder.isError(data.submissions) && (
                <ErrorTableBody message={data.submissions.error.message} />
              )}
            </Table>
          </Segment>
          <Segment style={{ textAlign: 'center' }} attached>
            <Pagination
              size="tiny"
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              boundaryRange={0}
              activePage={pageable.page + 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Segment>
        </>
      ) : (
        <Segment basic attached="bottom">
          <p>No submissions has been submitted</p>
        </Segment>
      )}
    </>
  );
});

PrincipalProblemSubsCard.displayName = 'PrincipalProblemSubsCard';
