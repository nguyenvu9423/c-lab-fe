import * as React from 'react';
import { SubmissionInProgressStatus } from '../../../domains/submission/progress/SubmissionProgressStatus';
import { InProgressLabel } from './ui-labels';

export function SubmissionInProgressLabel(props) {
  const { progress } = props;
  const { status, runningTest } = progress;
  let message;
  switch (status.name) {
    case SubmissionInProgressStatus.IN_QUEUE:
      message = 'In queue';
      break;
    case SubmissionInProgressStatus.INITIALIZING:
      message = 'Initializing';
      break;
    case SubmissionInProgressStatus.COMPILING:
      message = 'Compiling';
      break;
    case SubmissionInProgressStatus.TESTING:
      message = 'Testing';
      break;
    case SubmissionInProgressStatus.RUNNING_TEST:
      message = `Running test ${runningTest}`;
      break;
    default:
      message = '';
  }
  return <InProgressLabel message={message} />;
}
