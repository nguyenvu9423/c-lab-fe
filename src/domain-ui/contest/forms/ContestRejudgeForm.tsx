import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import { fetchContest, resetState } from '@/store/actions';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { Target } from '@/store/reducers/target';
import {
  AuthorizationSelectors,
  ConstSelectors,
  ContestSelectors,
} from '@/store/selectors';
import { State } from '@/store/state';
import { ContestProblemRejudgeForm } from './ContestProblemRejudgeForm';

export namespace ContestRejudgeForm {
  export interface Props {
    contestId: number;
  }
}

export const ContestRejudgeForm: React.FC<ContestRejudgeForm.Props> = (
  props,
) => {
  const { contestId } = props;
  const dispatch = useDispatch();

  const load = React.useCallback(() => {
    dispatch(
      fetchContest.request({
        type: 'byId',
        id: contestId,
        target: Target.CONTEST_REJUDGE_FORM,
      }),
    );
  }, [dispatch, contestId]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.CONTEST_REJUDGE_FORM }));
    };
  }, [dispatch, load]);

  const { data } = useSelector((state: State) => state.contestRejudgeForm);

  const contest = useSelector(
    DataHolder.isLoaded(data.contest)
      ? ContestSelectors.byId(contestId)
      : ConstSelectors.value(undefined),
  );

  const canEdit = useSelector(
    contest
      ? AuthorizationSelectors.canUpdateContest(contest)
      : () => undefined,
  );

  if (!contest) return null;

  if (!canEdit) {
    return <p>Bạn không có quyền chỉnh sửa kỳ thi này</p>;
  }

  const problemConfigs = contest.judgeConfig?.problemConfigs ?? [];

  return (
    <Tab
      menu={{ secondary: true, pointing: true }}
      panes={problemConfigs.map((problemConfig) => ({
        menuItem: problemConfig.code,
        render: () => (
          <ContestProblemRejudgeForm
            contestId={contest.id}
            problemId={problemConfig.problem}
          />
        ),
      }))}
    />
  );
};
