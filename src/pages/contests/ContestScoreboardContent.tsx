import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Message } from 'semantic-ui-react';

import {
  Contest,
  ContestJudgeType,
  isAcmContestUserResult,
  isOIContestUserResult,
} from '@/domains/contest';
import { resetState } from '@/store/actions';
import { Target } from '@/store/reducers/target';
import { fetchContestUserResults } from '@/store/actions';
import { ContestUserResultSelectors } from '@/store/selectors';
import { State } from '@/store/state';
import { LoadingState } from '@/store/common';
import { BaseContestContentProps } from './shared';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { Pagination } from '@/components/index';

import { PageUtils } from '../shared';
import { AcmContestScoreboard } from './components/scoreboards/AcmContestScoreboard';
import { OIContestScoreboard } from './components/scoreboards/OIContestScoreboard';

export namespace ContestScoreboardContent {
  export interface Props extends BaseContestContentProps {}
}

export const ContestScoreboardContent: React.FC<
  ContestScoreboardContent.Props
> = (props) => {
  const { contest, nav } = props;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          {nav}
          <ContestScoreboardCard contest={contest} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const PAGE_SIZE = 10;

const ContestScoreboardCard: React.FC<{ contest: Contest }> = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const { contest } = props;
  const { judgeConfig } = contest;

  const load = useCallback(() => {
    dispatch(
      fetchContestUserResults.request({
        contestId: contest.id,
        pageable: { page, size: PAGE_SIZE },
        target: Target.ContestPageContents.SCOREBOARD,
      }),
    );
  }, [dispatch, contest.id, page]);

  useEffect(() => {
    load();
  }, [dispatch, load]);

  useEffect(() => {
    return () => {
      dispatch(
        resetState({
          target: Target.ContestPageContents.SCOREBOARD,
        }),
      );
    };
  }, [dispatch]);

  const { data } = useSelector(
    (state: State) => state.contestPageContents.scoreboard,
  );

  const userResults = useSelector(
    data.userResults.loadingState === LoadingState.LOADED
      ? ContestUserResultSelectors.byIds(data.userResults.results)
      : () => undefined,
  );

  const loadTotalPages = DataHolder.useTotalPages(data.userResults);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);

  if (!judgeConfig)
    return <Message content="Cấu hình chấm thi chưa được cài đặt" />;

  return (
    <div>
      <div style={{ minHeight: 596 }}>
        {judgeConfig.type === ContestJudgeType.ACM ? (
          <AcmContestScoreboard
            contestId={contest.id}
            problemConfigs={judgeConfig.problemConfigs}
            userResults={userResults?.filter(isAcmContestUserResult) ?? []}
          />
        ) : (
          <OIContestScoreboard
            contestId={contest.id}
            problemConfigs={judgeConfig.problemConfigs}
            userResults={userResults?.filter(isOIContestUserResult) ?? []}
          />
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          activePage={page}
          totalPages={totalPages || 0}
          onPageChange={(_event, data) => {
            if (data.activePage) setPage(Number(data.activePage));
          }}
          size="small"
        />
      </div>
    </div>
  );
};
