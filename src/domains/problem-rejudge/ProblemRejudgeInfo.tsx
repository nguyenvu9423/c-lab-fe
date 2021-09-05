import * as React from 'react';
import { Button, Header, Progress, Statistic } from 'semantic-ui-react';
import { ProblemRejudgeService } from '../../service/ProblemRejudgeService';
import { ProblemRejudgeStatus } from './problem-rejudge-progress';
import { ProblemRejudge } from './ProblemRejudge';
import { useProblemRejudgeStream } from './useProblemRejudgeStream';

export namespace ProblemRejudgeInfo {
  export interface Props {
    problemRejudge: ProblemRejudge;
  }
}

export const ProblemRejudgeInfo: React.FC<ProblemRejudgeInfo.Props> = ({
  problemRejudge,
}) => {
  const { progress, total } = problemRejudge;
  const { status, doneCount } = progress;

  useProblemRejudgeStream([problemRejudge.id]);

  const cancel = React.useCallback(() => {
    return ProblemRejudgeService.cancel(problemRejudge.id);
  }, [problemRejudge.id]);

  return (
    <div>
      <Header as="h3">The latest rejudge</Header>
      {status === ProblemRejudgeStatus.IN_QUEUE && (
        <Progress percent={0} label="In queue" />
      )}
      {status === ProblemRejudgeStatus.IN_PROGRESS && (
        <Progress
          autoSuccess
          value={doneCount}
          total={total}
          label={`${doneCount}/${total}`}
          percent={total === 0 ? 100 : undefined}
        />
      )}
      {ProblemRejudgeStatus.isInProgress(status) && (
        <Button
          content="Cancel"
          negative
          icon="cancel"
          floated="right"
          onClick={cancel}
        />
      )}

      {status === ProblemRejudgeStatus.SUCCESSFUL && (
        <>
          <Progress success percent={100} label="Done" />
          <ProblemRejudgeResult problemRejudge={problemRejudge} />
        </>
      )}

      {status === ProblemRejudgeStatus.ERROR && (
        <Progress error percent={100} label="Error" />
      )}
    </div>
  );
};

const ProblemRejudgeResult: React.FC<{ problemRejudge: ProblemRejudge }> = (
  props
) => {
  const {
    total,
    progress: { doneCount },
  } = props.problemRejudge;

  return (
    <Statistic.Group
      size="mini"
      items={[
        { key: 'total', label: 'total', value: total },
        { key: 'done', label: 'success', color: 'green', value: doneCount },
        {
          key: 'failed',
          label: 'failed',
          color: 'red',
          value: total - doneCount,
        },
      ]}
    />
  );
};
