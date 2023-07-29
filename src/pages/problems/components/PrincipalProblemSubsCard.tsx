import * as React from 'react';
import {
  Header,
  Segment,
  Pagination,
  Table,
  PaginationProps,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions, resetState } from '@/store/actions';
import { SubmissionSelectors } from '@/store/selectors/SubmissionSelectors';
import { Target } from '@/store/reducers/target';

import { State } from '@/store/state';
import { Submission } from '@/domains/submission';
import { useJudgesStream } from '@/domain-ui/judge';
import {
  SubmissionDetailsLink,
  SubmissionStatusLabel,
} from '@/domain-ui/submission';
import { ErrorTableBody, LoadingTableBody } from '@/components/table';
import {
  DataHolder,
  DataHolderState,
} from '@/store/reducers/data-holders/shared';

import { useHighlightSub } from '../useHighlightSub';
import { PageUtils } from '../../shared';

export const PAGE_SIZE = 4;

export namespace PrincipalProblemSubsCard {
  export interface Props {
    problemCode: string;
    username: string;
  }

  export interface Ref {
    reload: (params: { highlightSubId?: number }) => void;
  }
}

export const PrincipalProblemSubsCard: React.FC<
  PrincipalProblemSubsCard.Props &
    React.RefAttributes<PrincipalProblemSubsCard.Ref>
> = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const { problemCode, username } = props;
  const { data } = useSelector(
    (state: State) => state.principalProblemSubsCard,
  );

  const submissions = useSelector(
    DataHolderState.isLoaded(data.submissions)
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : () => undefined,
  );

  const [page, setPage] = React.useState(1);
  const loadTotalPages = DataHolder.useTotalPages(data.submissions);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);
  PageUtils.useCorrectPageListener(page, totalPages, setPage);

  const [highlightSubId, setHighLightSubId] = React.useState<
    number | undefined
  >(undefined);

  const load = React.useCallback(
    (params?: { highlightSubId?: number }) => {
      dispatch(
        fetchSubmissions.request({
          type: 'byUserAndProblem',
          problemCode,
          username,
          pageable: { page, size: PAGE_SIZE },
          target: Target.PRINCIPAL_PROBLEM_SUBS_CARD,
        }),
      );
      if (params?.highlightSubId) {
        setHighLightSubId(params.highlightSubId);
      }
    },
    [dispatch, username, problemCode, page],
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.PRINCIPAL_PROBLEM_SUBS_CARD }));
    };
  }, [load, dispatch]);

  useJudgesStream(
    submissions
      ? submissions
          .filter((sub): sub is Submission => {
            return sub !== undefined;
          })
          .map((sub) => sub.judge)
      : [],
  );

  const handlePageChange = React.useCallback(
    (event, { activePage }: PaginationProps) => setPage(Number(activePage)),
    [setPage],
  );

  React.useImperativeHandle(
    ref,
    () => ({
      reload: load,
    }),
    [load],
  );

  const uiHighlightSubId = useHighlightSub(highlightSubId);

  return (
    <>
      <Header as="h3" attached="top">
        Bài đã nộp
      </Header>
      {submissions?.length !== 0 ? (
        <>
          <Segment style={{ height: 230, paddingTop: 0 }} attached>
            <Table basic fixed singleLine style={{ border: 0 }} unstackable>
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
                      <Table.Row
                        key={submission.id}
                        style={{ height: 42 }}
                        active={uiHighlightSubId === submission.id}
                      >
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
              activePage={page}
              totalPages={totalPages || 0}
              onPageChange={handlePageChange}
            />
          </Segment>
        </>
      ) : (
        <Segment basic attached="bottom">
          <p>Chưa nộp bài</p>
        </Segment>
      )}
    </>
  );
});

PrincipalProblemSubsCard.displayName = 'PrincipalProblemSubsCard';
