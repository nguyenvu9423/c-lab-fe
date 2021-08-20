import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  SubmissionSelectors,
  PrincipalSelectors,
} from '../../../store/selectors';
import { fetchSubmissions } from '../../../store/actions/submission';
import { LoadingState } from '../../../store/common';
import { Dimmer, Grid, Loader, Pagination, Segment } from 'semantic-ui-react';
import { useJudgesStream } from '../../../domains/judge';
import { Target } from '../../../store/reducers/target';
import { resetState } from '../../../store/actions';
import { Problem } from '../../../domains/problem';
import { User } from '../../../domains/user';
import { State } from '../../../store';
import { ProblemNavMenu } from '../components/ProblemNavMenu';
import { SubmissionCard } from '../components/SubmissionCard';
import { TagContainer } from '../../../components';
import { SubmissionsTable } from '../components/SubmissionsTable';

const PAGE_SIZE = 10;

export const PrincipalProblemSubsContent: React.FC<{ problem: Problem }> = (
  props
) => {
  const { problem } = props;
  const principal = useSelector(PrincipalSelectors.principal());
  const tableRef = React.useRef<PrincipalSubmissionTable.Ref | null>(null);
  return (
    <>
      <Grid.Column width={12}>
        <ProblemNavMenu problem={problem} tabName="my" />
        <Segment attached="bottom">
          {principal ? (
            <PrincipalSubmissionTable
              ref={tableRef}
              user={principal}
              problem={problem}
            />
          ) : (
            <p>Please login to see the page</p>
          )}
        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <SubmissionCard
          problem={problem}
          onSuccess={() => tableRef.current?.reload()}
        />
        <TagContainer ids={problem.tags} />
      </Grid.Column>
    </>
  );
};

export namespace PrincipalSubmissionTable {
  export interface Props {
    problem: Problem;
    user: User;
  }
  export interface Ref {
    reload: () => void;
  }
}
export const PrincipalSubmissionTable: React.FC<
  PrincipalSubmissionTable.Props &
    React.RefAttributes<PrincipalSubmissionTable.Ref>
> = React.forwardRef((props, ref) => {
  const { problem, user } = props;
  const history = useHistory<{ highlightSubId: number }>();

  const { data } = useSelector(
    (state: State) => state.problemPageContents.principalSubmissions
  );

  const highlightSubId = history.location.state?.highlightSubId;
  const dispatch = useDispatch();

  const load = React.useCallback(
    ({ pageable } = {}) => {
      dispatch(
        fetchSubmissions.request({
          type: 'byUserAndProblem',
          userId: user.id,
          problemId: problem.id,
          pageable: pageable ?? data.submissions.pageable,
          target: Target.ProblemPageContents.PRINCIPAL_SUBMISSIONS,
        })
      );
    },
    [data, user]
  );

  React.useImperativeHandle(
    ref,
    () => ({
      reload: () => load(),
    }),
    [load]
  );

  React.useEffect(() => {
    load({ pageable: { page: 0, size: PAGE_SIZE } });
    return () => {
      dispatch(
        resetState({
          target: Target.ProblemPageContents.PRINCIPAL_SUBMISSIONS,
        })
      );
    };
  }, []);

  const submissions = useSelector(
    data.submissions.loadingState === LoadingState.LOADED
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : () => undefined
  );

  useJudgesStream(submissions ? submissions.map((sub) => sub.judge) : []);

  const handlePageChange = React.useCallback((event, { activePage }) => {
    dispatch(load({ pageable: { page: activePage - 1, size: PAGE_SIZE } }));
  }, []);

  return (
    <>
      <Dimmer
        active={data.submissions.loadingState === LoadingState.LOADING}
        inverted
      >
        <Loader />
      </Dimmer>
      {data.submissions.loadingState === LoadingState.LOADED && (
        <>
          <SubmissionsTable
            submissions={submissions ?? []}
            highlightSubId={highlightSubId}
          />
          <div style={{ textAlign: 'center' }}>
            <Pagination
              activePage={data.submissions.pageable.page + 1}
              totalPages={data.submissions.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
});

PrincipalSubmissionTable.displayName = 'PrincipalSubmissionTable';
