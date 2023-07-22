import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Lodash from 'lodash';
import { useLocation } from 'react-router';

import { Grid, Pagination, Segment, Ref, PaginationProps } from 'semantic-ui-react';

import { SubmissionSelectors, PrincipalSelectors } from '@/store/selectors';
import { fetchSubmissions } from '@/store/actions/submission';
import { LoadingState } from '@/store/common';
import { useJudgesStream } from '@/domain-ui/judge';
import { Target } from '@/store/reducers/target';
import { resetState } from '@/store/actions';
import { Problem } from '@/domains/problem';
import { User } from '@/domains/user';
import { State } from '@/store';
import { TagContainer } from '@/components';
import { scrollToElementTop } from '@/utils';
import { DataHolder } from '@/store/reducers/data-holders/shared';

import {
  ProblemInfoCard,
  ProblemNavMenu,
  SubmissionCard,
  SubmissionsTable,
} from '../components';

import { useHighlightSub } from '../useHighlightSub';
import { PageUtils } from '../../shared';

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
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(1);

  const { data } = useSelector(
    (state: State) => state.problemPageContents.principalSubmissions
  );

  const uiHighlightSubId = useHighlightSub(
    Lodash.get(location.state, 'highlightSubId')
  );

  const loadTotalPages = DataHolder.useTotalPages(data.submissions);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);

  const load = React.useCallback(() => {
    dispatch(
      fetchSubmissions.request({
        type: 'byUserAndProblem',
        username: user.username,
        problemCode: problem.code,
        pageable: { page, size: PAGE_SIZE },
        target: Target.ProblemPageContents.PRINCIPAL_SUBMISSIONS,
      })
    );
  }, [dispatch, user.username, problem.code, page]);

  React.useImperativeHandle(ref, () => ({ reload: () => load() }), [load]);
  React.useEffect(() => {
    load();
    return () => {
      dispatch(
        resetState({ target: Target.ProblemPageContents.PRINCIPAL_SUBMISSIONS })
      );
    };
  }, [load, dispatch]);

  const submissions = useSelector(
    data.submissions.loadingState === LoadingState.LOADED
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : () => undefined
  );

  useJudgesStream(submissions ? submissions.map((sub) => sub.judge) : []);

  const tableRef = React.useRef<HTMLElement>(null);
  const handlePageChange = React.useCallback((event, { activePage }: PaginationProps) => {
    if (!activePage) return;

    setPage(Number(activePage));
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
            highlightSubId={uiHighlightSubId}
          />
        </Ref>
      </Segment>

      <Segment textAlign="center">
        <Pagination
          activePage={page}
          totalPages={totalPages || 0}
          onPageChange={handlePageChange}
        />
      </Segment>
    </Segment.Group>
  );
});

PrincipalSubmissionTable.displayName = 'PrincipalSubmissionTable';
