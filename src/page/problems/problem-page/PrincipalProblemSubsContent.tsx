import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Pagination, Segment, Ref } from 'semantic-ui-react';

import {
  SubmissionSelectors,
  PrincipalSelectors,
} from '../../../store/selectors';
import { fetchSubmissions } from '../../../store/actions/submission';
import { LoadingState } from '../../../store/common';
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
import { Pageable, scrollToElementTop } from '../../../utility';
import { DataHolder } from '../../../store/reducers/data-holders/shared';
import { ProblemInfoCard } from '../components';
import { useLocation } from 'react-router';

const PAGE_SIZE = 10;
const initialPageable: Pageable = {
  page: 0,
  size: PAGE_SIZE,
};

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
        {principal ? (
          <PrincipalSubmissionTable
            ref={tableRef}
            user={principal}
            problem={problem}
          />
        ) : (
          <p>Vui lòng đăng nhập để truy cập</p>
        )}
      </Grid.Column>
      <Grid.Column width={4}>
        <ProblemInfoCard problem={problem} />
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
  const location = useLocation();
  const tableRef = React.useRef<HTMLElement>(null);

  const { data } = useSelector(
    (state: State) => state.problemPageContents.principalSubmissions
  );

  const highlightSubId = location.state?.highlightSubId;
  const dispatch = useDispatch();

  const pageable = DataHolder.usePageable(data.submissions, initialPageable);
  const totalPages = DataHolder.useTotalPages(data.submissions);

  const load = React.useCallback(
    (params?: { pageable: Pageable }) => {
      dispatch(
        fetchSubmissions.request({
          type: 'byUserAndProblem',
          userId: user.id,
          problemCode: problem.code,
          pageable: params?.pageable ?? pageable,
          target: Target.ProblemPageContents.PRINCIPAL_SUBMISSIONS,
        })
      );
    },
    [dispatch, data, user.id, problem.code, pageable]
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
    load({ pageable: { page: activePage - 1, size: PAGE_SIZE } });
    if (tableRef.current) {
      scrollToElementTop(tableRef.current);
    }
  }, []);

  return (
    <Segment.Group>
      <Segment style={{ minHeight: 678, padding: 0 }}>
        <Ref innerRef={tableRef}>
          <SubmissionsTable
            loading={DataHolder.isLoading(data.submissions)}
            errorMessage={
              DataHolder.isError(data.submissions)
                ? data.submissions.error.message
                : undefined
            }
            submissions={submissions}
            highlightSubId={highlightSubId}
          />
        </Ref>
      </Segment>

      <Segment textAlign="center">
        <Pagination
          activePage={pageable.page + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Segment>
    </Segment.Group>
  );
});

PrincipalSubmissionTable.displayName = 'PrincipalSubmissionTable';
