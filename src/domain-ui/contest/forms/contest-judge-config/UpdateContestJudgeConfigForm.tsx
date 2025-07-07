import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/store/state';
import { LoadingState } from '@/store/common';
import { AuthorizationSelectors, ContestSelectors } from '@/store/selectors';
import { fetchContest, resetState } from '@/store/actions';
import { Target } from '@/store/reducers/target';
import { LoadingIndicator } from '@/components/loading-indicator';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { Contest } from '@/domains/contest';
import { AddJudgeConfigForm } from './AddContestJudgeConfigForm';
import { EditContestJudgeConfigForm } from './EditContestJudgeConfigForm';

export namespace UpdateContestJudgeConfigForm {
  export interface Props {
    contestId: number;
    onSuccess?: () => void;
  }
}

export const UpdateContestJudgeConfigForm: React.FC<
  UpdateContestJudgeConfigForm.Props
> = (props) => {
  const { contestId, onSuccess } = props;
  const dispatch = useDispatch();

  const { data } = useSelector(
    (state: State) => state.editContestJudgeConfigForm,
  );

  const contest: Contest | undefined = useSelector(
    data.contest.loadingState === LoadingState.LOADED
      ? ContestSelectors.byId(data.contest.id)
      : () => undefined,
  );

  React.useEffect(() => {
    dispatch(
      fetchContest.request({
        type: 'byId',
        id: contestId,
        target: Target.EDIT_CONTEST_JUDGE_CONFIG_FORM,
      }),
    );
    return () => {
      dispatch(resetState({ target: Target.EDIT_CONTEST_JUDGE_CONFIG_FORM }));
    };
  }, [dispatch, contestId]);

  const canEdit = useSelector(
    contest
      ? AuthorizationSelectors.canUpdateContest(contest)
      : () => undefined,
  );

  if (!canEdit) {
    return <p>Bạn không có quyền chỉnh sửa kỳ thi này</p>;
  }

  if (DataHolder.isLoading(data.contest)) {
    return <LoadingIndicator />;
  }

  return DataHolder.isLoaded(data.contest) && contest ? (
    contest.judgeConfig ? (
      <EditContestJudgeConfigForm
        contestId={contestId}
        judgeConfig={contest.judgeConfig}
        onSuccess={onSuccess}
      />
    ) : (
      <AddJudgeConfigForm contestId={contestId} onSuccess={onSuccess} />
    )
  ) : null;
};
