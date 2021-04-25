import * as React from 'react';
import { ErrorLabel } from './ui-labels';
import { SubmissionErrorStatus } from '../../../domains/submission/progress/SubmissionProgressStatus';

export function SubmissionErrorLabel(props) {
  const {
    progress: { status }
  } = props;
  let message;
  switch (status.name) {
    case SubmissionErrorStatus.SYSTEM_ERROR:
      message = 'System error';
      break;
    default:
      message = '';
  }
  return <ErrorLabel message={message} />;
}
