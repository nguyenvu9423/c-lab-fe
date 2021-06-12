import * as React from 'react';
import { JudgeInProgressStatus } from '.';
import { InProgressLabel } from './ui-labels';

export function JudgeInProgressLabel(props) {
  const { progress } = props;
  const { status, runningTest } = progress;
  let message;
  switch (status.name) {
    case JudgeInProgressStatus.IN_QUEUE:
      message = 'In queue';
      break;
    case JudgeInProgressStatus.INITIALIZING:
      message = 'Initializing';
      break;
    case JudgeInProgressStatus.COMPILING:
      message = 'Compiling';
      break;
    case JudgeInProgressStatus.TESTING:
      message = 'Testing';
      break;
    case JudgeInProgressStatus.RUNNING_TEST:
      message = `Running test ${runningTest}`;
      break;
    default:
      message = '';
  }
  return <InProgressLabel message={message} />;
}
