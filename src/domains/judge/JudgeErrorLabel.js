import * as React from 'react';
import { ErrorLabel } from './ui-labels';
import { JudgeErrorStatus } from './JudgeProgressStatus';

export function JudgeErrorLabel(props) {
  const {
    progress: { status }
  } = props;
  let message;
  switch (status.name) {
    case JudgeErrorStatus.SYSTEM_ERROR:
      message = 'System error';
      break;
    default:
      message = '';
  }
  return <ErrorLabel message={message} />;
}
