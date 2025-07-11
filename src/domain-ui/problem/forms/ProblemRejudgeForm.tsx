import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Divider } from 'semantic-ui-react';
import { fetchDetailedProblem, resetState } from '@/store/actions';
import {
  ProblemRejudgeSelectors,
  DetailedProblemSelectors,
  AuthorizationSelectors,
  ConstSelectors,
} from '@/store/selectors';
import { LoadingIndicator } from '@/components/loading-indicator';
import { ProblemRejudgeStatus } from '@/domains/problem-rejudge';
import { ProblemService } from '@/services/ProblemService';
import { ProblemRejudgeService } from '@/services/judge';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { Target } from '@/store/reducers/target';
import { State } from '@/store/state';
import { ProblemRejudgeInfo } from '@/domains/problem-rejudge';
import { useProblemRejudgeStream } from '@/domain-ui/problem-rejudge';

export namespace ProblemRejudgeForm {
  export interface Props {
    problemCode: string;
  }
}

export const ProblemRejudgeForm: React.FC<ProblemRejudgeForm.Props> = (
  props,
) => {
  const { problemCode } = props;

  const dispatch = useDispatch();

  const { data } = useSelector((state: State) => state.problemRejudgeForm);

  const detailedProblem = useSelector(
    DataHolder.isLoaded(data.detailedProblem)
      ? DetailedProblemSelectors.selectById(data.detailedProblem.id)
      : ConstSelectors.value(undefined),
  );

  const problemRejudge = useSelector(
    detailedProblem
      ? detailedProblem?.problemRejudge
        ? ProblemRejudgeSelectors.byId(detailedProblem.problemRejudge)
        : ConstSelectors.value(null)
      : ConstSelectors.value(undefined),
  );

  useProblemRejudgeStream(problemRejudge ? [problemRejudge.id] : []);

  const load = React.useCallback(() => {
    dispatch(
      fetchDetailedProblem.request({
        type: 'byCode',
        code: problemCode,
        target: Target.PROBLEM_REJUDGE_FORM,
      }),
    );
  }, [dispatch, problemCode]);

  const rejudge = React.useCallback(() => {
    return ProblemService.rejudgeProblem(problemCode).then(() => {
      load();
    });
  }, [load, problemCode]);

  const cancel = React.useCallback(() => {
    if (!problemRejudge) return;
    return ProblemRejudgeService.cancel(problemRejudge.id);
  }, [problemRejudge]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.PROBLEM_REJUDGE_FORM }));
    };
  }, [dispatch, load]);

  const canRejudge = useSelector(
    detailedProblem
      ? AuthorizationSelectors.canUpdateProblem(detailedProblem)
      : () => undefined,
  );

  if (canRejudge === false) {
    return <p>Bạn không có quyền chấm lại bài này</p>;
  }

  if (DataHolder.isLoading(data.detailedProblem)) {
    return <LoadingIndicator />;
  }

  const inProgress = problemRejudge
    ? ProblemRejudgeStatus.isInProgress(problemRejudge.progress.status)
    : undefined;

  return (
    <>
      <Button
        icon="redo"
        content="Chấm lại"
        disabled={inProgress}
        onClick={rejudge}
      />
      {problemRejudge && (
        <>
          <Divider />
          <ProblemRejudgeInfo
            problemRejudge={problemRejudge}
            onCancel={cancel}
          />
        </>
      )}
    </>
  );
};
