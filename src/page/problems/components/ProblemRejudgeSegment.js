import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Progress, Header, Divider } from 'semantic-ui-react';
import { fetchProblemRejudge } from '../../../store/actions';
import { ProblemRejudgeSelectors } from '../../../store/selectors';
import { LoadingState } from '../../../store/common';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { ProblemRejudgeStatus } from '../../../domains/problem-rejudge/ProblemRejudgeStatus';
import { ProblemRejudgeService } from '../../../service/ProblemRejudgeService';
import { ProblemService } from '../../../service/ProblemService';
import { useProblemRejudgeStream } from '../../../domains/problem-rejudge/useProblemRejudgeStream';

export function ProblemRejudgeSegment(props) {
  const { problemId } = props;

  const { data } = useSelector((state) => state.problemRejudgePage);
  const problemRejudge = useSelector(
    ProblemRejudgeSelectors.byId(data.problemRejudge.id)
  );

  const dispatch = useDispatch();

  const load = React.useCallback(() => {
    dispatch(fetchProblemRejudge.request({ problemId }));
  }, []);

  const rejudge = React.useCallback(() => {
    ProblemService.rejudgeProblem(problemId).then(() => {
      load();
    });
  });

  React.useEffect(() => {
    load();
  }, []);

  if (LoadingState.isInProgress(data.problemRejudge.loadingState)) {
    return <LoadingIndicator />;
  }

  const inProgress = problemRejudge
    ? ProblemRejudgeStatus.isInProgress(problemRejudge.status)
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
}

function ProblemRejudge({ problemRejudge }) {
  const { progress, total, error } = problemRejudge;
  const { status, doneCount } = progress;

  useProblemRejudgeStream([problemRejudge.id]);
  const inProgress = ProblemRejudgeStatus.isInProgress(progress.status);
  const cancel = React.useCallback(() => {
    ProblemRejudgeService.cancel(problemRejudge.id);
  });

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
