import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider } from 'semantic-ui-react';
import { ProblemRejudgeInfo } from '@/domains/problem-rejudge';
import { ContestRejudgeService } from '@/services/contest';
import { resetState } from '@/store/actions';
import { fetchContestProblemRejudge } from '@/store/actions/contest/contest-problem-rejudge';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { Target } from '@/store/reducers/target';
import { State } from '@/store/state';
import {
  ConstSelectors,
  ContestProblemRejudgeSelectors,
} from '@/store/selectors';
import { useContestProblemRejudgeStream } from '../hooks/useContestProblemRejudgeStream';

export namespace ContestProblemRejudgeForm {
  export interface Props {
    problemId: number;

    contestId: number;
  }
}

export const ContestProblemRejudgeForm: React.FC<
  ContestProblemRejudgeForm.Props
> = (props: ContestProblemRejudgeForm.Props) => {
  const { contestId, problemId } = props;
  const dispatch = useDispatch();

  const { data } = useSelector(
    (state: State) => state.contestProblemRejudgeForm,
  );

  const load = React.useCallback(
    (contestId: number, problemId: number) => {
      dispatch(
        fetchContestProblemRejudge.request({
          type: 'latest',
          contestId,
          problemId,
          target: Target.CONTEST_PROBLEM_REJUDGE_FORM,
        }),
      );
    },
    [dispatch],
  );

  React.useEffect(() => load(contestId, problemId), [contestId, problemId]);
  React.useEffect(() => {
    return () => {
      dispatch(resetState({ target: Target.CONTEST_PROBLEM_REJUDGE_FORM }));
    };
  }, [dispatch]);

  const latestRejudge = useSelector(
    DataHolder.isLoaded(data.latestRejudge)
      ? data.latestRejudge.result
        ? ContestProblemRejudgeSelectors.byId(data.latestRejudge.result)
        : ConstSelectors.value(null)
      : ConstSelectors.value(undefined),
  );

  const rejudge = React.useCallback(() => {
    return ContestRejudgeService.rejudgeProblem({ problemId, contestId }).then(
      () => load(contestId, problemId),
    );
  }, [load, contestId, problemId]);

  const cancel = React.useCallback(() => {
    if (!latestRejudge) return;
    return ContestRejudgeService.cancel(latestRejudge.id);
  }, [latestRejudge]);

  useContestProblemRejudgeStream(latestRejudge ? [latestRejudge.id] : []);

  if (latestRejudge === undefined) return null;

  return (
    <>
      <Button icon="redo" content="Chấm lại" onClick={rejudge} />
      {latestRejudge && (
        <>
          <Divider />
          <ProblemRejudgeInfo
            problemRejudge={latestRejudge}
            onCancel={cancel}
          />
        </>
      )}
    </>
  );
};
