import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Progress, Header, Divider } from 'semantic-ui-react';
import { fetchDetailedProblem, resetState } from '../../../store/actions';
import {
  ProblemRejudgeSelectors,
  DetailedProblemSelectors,
  AuthorizationSelectors,
  ConstSelectors,
} from '../../../store/selectors';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { ProblemRejudgeStatus } from '../../../domains/problem-rejudge';
import { ProblemRejudgeService } from '../../../service/ProblemRejudgeService';
import { ProblemService } from '../../../service/ProblemService';
import { useProblemRejudgeStream } from '../../../domains/problem-rejudge/useProblemRejudgeStream';
import { State } from '../../../store';
import { DataHolder } from '../../../store/reducers/data-holders/shared';
import { Target } from '../../../store/reducers/target';

export namespace ProblemRejudgeForm {
  export type Props =
    | (BaseProps & { problemId: number })
    | (BaseProps & { problemCode: string });

  export interface BaseProps {
    problemId?: number;
    problemCode?: string;
  }
}

export const ProblemRejudgeForm: React.FC<ProblemRejudgeForm.Props> = (
  props
) => {
  const { problemId, problemCode } = props;

  const dispatch = useDispatch();

  const { data } = useSelector((state: State) => state.problemRejudgeForm);

  const detailedProblem = useSelector(
    DataHolder.isLoaded(data.detailedProblem)
      ? DetailedProblemSelectors.selectById(data.detailedProblem.id)
      : ConstSelectors.value(undefined)
  );

  const problemRejudge = useSelector(
    detailedProblem
      ? detailedProblem?.problemRejudge
        ? ProblemRejudgeSelectors.byId(detailedProblem.problemRejudge)
        : ConstSelectors.value(null)
      : ConstSelectors.value(undefined)
  );

  const load = React.useCallback(() => {
    if (problemId) {
      dispatch(
        fetchDetailedProblem.request({
          type: 'byId',
          id: problemId,
          target: Target.PROBLEM_REJUDGE_FORM,
        })
      );
    } else {
      dispatch(
        fetchDetailedProblem.request({
          type: 'byCode',
          code: problemCode!,
          target: Target.PROBLEM_REJUDGE_FORM,
        })
      );
    }
  }, [dispatch, problemId, problemCode]);

  const rejudge = React.useCallback(() => {
    if (detailedProblem) {
      ProblemService.rejudgeProblem(detailedProblem.id).then(() => {
        load();
      });
    }
  }, [load, detailedProblem]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.PROBLEM_REJUDGE_FORM }));
    };
  }, [dispatch, load]);

  const canRejudge = useSelector(
    detailedProblem
      ? AuthorizationSelectors.canUpdateProblem(detailedProblem)
      : () => undefined
  );

  if (canRejudge === false) {
    return <p>You do not have the permission to rejudge this problem</p>;
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
        content="Rejudge"
        disabled={inProgress}
        onClick={rejudge}
      />
      {problemRejudge && (
        <>
          <Divider />
          <ProblemRejudge problemRejudge={problemRejudge} />
        </>
      )}
    </>
  );
};

function ProblemRejudge({ problemRejudge }) {
  const { progress, total, error } = problemRejudge;
  const { status, doneCount } = progress;

  useProblemRejudgeStream([problemRejudge.id]);

  const inProgress = ProblemRejudgeStatus.isInProgress(status);

  const cancel = React.useCallback(() => {
    ProblemRejudgeService.cancel(problemRejudge.id);
  }, []);

  return (
    <div>
      <Header as="h3">The latest rejudge</Header>
      <Progress
        autoSuccess
        value={doneCount}
        total={total}
        label={`${doneCount}/${total ?? '--'}`}
        percent={total === 0 ? 100 : undefined}
        error={error}
      />
      {inProgress && (
        <Button
          content="Cancel"
          negative
          icon="cancel"
          floated="right"
          onClick={cancel}
        />
      )}
    </div>
  );
}
