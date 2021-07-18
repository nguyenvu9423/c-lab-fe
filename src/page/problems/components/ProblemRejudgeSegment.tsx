import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Progress, Header, Divider } from 'semantic-ui-react';
import { fetchDetailedProblem } from '../../../store/actions';
import {
  ProblemRejudgeSelectors,
  DetailedProblemSelectors,
} from '../../../store/selectors';
import { LoadingState } from '../../../store/common';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { ProblemRejudgeStatus } from '../../../domains/problem-rejudge';
import { ProblemRejudgeService } from '../../../service/ProblemRejudgeService';
import { ProblemService } from '../../../service/ProblemService';
import { useProblemRejudgeStream } from '../../../domains/problem-rejudge/useProblemRejudgeStream';
import { State } from '../../../store';

export namespace ProblemRejudgeSegment {
  export type Props =
    | (BaseProps & { problemId: number })
    | (BaseProps & { problemCode: string });

  export interface BaseProps {
    problemId?: number;
    problemCode?: string;
  }
}

export const ProblemRejudgeSegment: React.FC<ProblemRejudgeSegment.Props> = (
  props
) => {
  const { problemId, problemCode } = props;
  const dispatch = useDispatch();

  const { data } = useSelector((state: State) => state.problemRejudgePage);

  const detailedProblem = useSelector(
    data.detailedProblem.loadingState === LoadingState.LOADED
      ? DetailedProblemSelectors.selectById(data.detailedProblem.id)
      : () => undefined
  );

  const problemRejudge = useSelector(
    detailedProblem
      ? detailedProblem?.problemRejudge
        ? ProblemRejudgeSelectors.byId(detailedProblem.problemRejudge)
        : () => null
      : () => undefined
  );

  const load = React.useCallback(() => {
    dispatch(
      fetchDetailedProblem.request({ type: 'byCode', code: problemCode! })
    );
  }, []);

  const rejudge = React.useCallback(() => {
    if (detailedProblem) {
      ProblemService.rejudgeProblem(detailedProblem.id).then(() => {
        load();
      });
    }
  }, [detailedProblem]);

  React.useEffect(() => {
    load();
  }, []);

  if (LoadingState.isInProgress(data.detailedProblem.loadingState)) {
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
        value={doneCount}
        total={total}
        label={`${doneCount}/${total}`}
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
