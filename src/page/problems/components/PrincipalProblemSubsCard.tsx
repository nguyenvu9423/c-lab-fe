import * as React from 'react';
import { Header, Segment, Pagination, Dimmer, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissions, resetState } from '../../../store/actions';
import { SubmissionSelectors } from '../../../store/selectors/SubmissionSelectors';
import { LoadingState } from '../../../store/common';
import { Target } from '../../../store/reducers/target';
import { CompactSubmissionTable } from './CompactSubmissionsTable';
import { useJudgesStream } from '../../../domains/judge';
import { State } from '../../../store/state';
import { Submission } from '../../../domains/submission';
import { DataHolderState } from '../../../store/reducers/data-holders/shared';
import { Pageable } from '../../../utility';

export const PAGE_SIZE = 5;

const initialPageable: Pageable = {
  page: 0,
  size: PAGE_SIZE,
};

export namespace PrincipalProblemSubsCard {
  export interface Props {
    problemId: number;
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

  const { problemId, userId } = props;
  const { data } = useSelector(
    (state: State) => state.principalProblemSubsCard
  );

  const submissions = useSelector(
    DataHolderState.isLoaded(data.submissions)
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : () => undefined
  );

  const currentPageable = DataHolderState.isLoadRequested(data.submissions)
    ? data.submissions.pageable
    : initialPageable;

  const load = React.useCallback(
    ({ pageable } = {}) => {
      dispatch(
        fetchSubmissions.request({
          type: 'byUserAndProblem',
          problemId,
          userId,
          pageable: pageable ?? currentPageable,
          target: Target.PRINCIPAL_PROBLEM_SUBS_CARD,
        })
      );
    },
    [dispatch, userId, problemId, currentPageable]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.PRINCIPAL_PROBLEM_SUBS_CARD }));
    };
  }, [dispatch]);

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

  React.useImperativeHandle(ref, () => ({ reload: () => load() }), [load]);

  return (
    <>
      <Header as="h3" attached="top">
        Bài đã nộp
      </Header>
      <Segment attached>
        {data.submissions.loadingState === LoadingState.LOADING && (
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        )}
        {data.submissions.loadingState === LoadingState.LOADED && submissions && (
          <>
            <CompactSubmissionTable submissions={submissions} />
            <div style={{ textAlign: 'center' }}>
              <Pagination
                size="tiny"
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                boundaryRange={0}
                activePage={currentPageable.page + 1}
                totalPages={data.submissions.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </Segment>
    </>
  );
});

PrincipalProblemSubsCard.displayName = 'PrincipalProblemSubsCard';
