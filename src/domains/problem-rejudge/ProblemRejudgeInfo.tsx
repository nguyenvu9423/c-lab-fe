import * as React from 'react';
import { Button, Header, Progress, Statistic } from 'semantic-ui-react';
import { ProblemRejudgeService } from '../../services/judge/ProblemRejudgeService';
import { ProblemRejudgeStatus } from './problem-rejudge-progress';
import { ProblemRejudge } from './ProblemRejudge';
import { useProblemRejudgeStream } from '../../domain-ui/problem-rejudge/hooks/useProblemRejudgeStream';

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
      <Header as="h3">Lần chấm gần nhất</Header>
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
          negative
          icon="cancel"
          floated="right"
          content="Dừng"
          onClick={cancel}
        />
      )}

      {status === ProblemRejudgeStatus.SUCCESSFUL && (
        <>
          <Progress success percent={100} label="Done" />
          <ProblemRejudgeResult problemRejudge={problemRejudge} />
        </>
      )}

      {status === ProblemRejudgeStatus.CANCELLED && (
        <Progress error percent={100} label="Cancelled" />
      )}

      {status === ProblemRejudgeStatus.REJECTED && (
        <Progress error percent={100} label="Rejected" />
      )}

      {status === ProblemRejudgeStatus.ERROR && (
        <Progress error percent={100} label="Error" />
      )}
    </div>
  );
};

const ProblemRejudgeResult: React.FC<{ problemRejudge: ProblemRejudge }> = (
  props,
) => {
  const {
    total,
    result: { doneCount, successCount, failureCount },
  } = props.problemRejudge;

  return (
    <Statistic.Group
      size="mini"
      items={[
        { key: 'total', label: 'total', value: total },
        { key: 'submitted', label: 'submitted', value: doneCount },
        {
          key: 'success',
          label: 'success',
          color: 'green',
          value: successCount,
        },
        {
          key: 'failed',
          label: 'failed',
          color: 'red',
          value: failureCount,
        },
      ]}
    />
  );
};
