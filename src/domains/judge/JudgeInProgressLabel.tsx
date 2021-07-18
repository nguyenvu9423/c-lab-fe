import * as React from 'react';
import { InProgressLabel } from './ui-labels';
import { JudgeProgressStatus, JudgeProgress } from './judge-progress';

export const JudgeInProgressLabel: React.FC<{ progress: JudgeProgress }> = (
  props
) => {
  const { progress } = props;
  const { status, runningTest } = progress;
  let message;
  switch (status) {
    case JudgeProgressStatus.IN_QUEUE:
      message = 'In queue';
      break;
    case JudgeProgressStatus.INITIALIZING:
      message = 'Initializing';
      break;
    case JudgeProgressStatus.COMPILING:
      message = 'Compiling';
      break;
    case JudgeProgressStatus.TESTING:
      message = 'Testing';
      break;
    case JudgeProgressStatus.RUNNING_TEST:
      message = `Running test ${runningTest}`;
      break;
    default:
      message = '';
  }
  return <InProgressLabel message={message} />;
};
