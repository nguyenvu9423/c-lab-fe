import * as React from 'react';
import { ErrorLabel } from './ui-labels';
import { JudgeProgress, JudgeProgressStatus } from '@/domains/judge';
import { LabelStyles } from './shared';

export namespace JudgeErrorLabel {
  export interface Props extends LabelStyles {
    progress: JudgeProgress;
  }
}
export const JudgeErrorLabel: React.FC<JudgeErrorLabel.Props> = (props) => {
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
