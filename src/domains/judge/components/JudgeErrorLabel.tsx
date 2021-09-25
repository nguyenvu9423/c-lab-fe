import * as React from 'react';
import { ErrorLabel } from './ui-labels';
import { JudgeProgress, JudgeProgressStatus } from '../progress';

export const JudgeErrorLabel: React.FC<{ progress: JudgeProgress }> = (
  props
) => {
  const {
    progress: { status },
  } = props;
  let message;
  switch (status) {
    case JudgeProgressStatus.ERROR:
      message = 'System error';
      break;
    default:
      message = '';
  }
  return <ErrorLabel message={message} />;
};
