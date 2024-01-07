import * as React from 'react';
import { ErrorLabel } from './ui-labels';
import { JudgeError, JudgeErrorType } from '@/domains/judge';
import { LabelStyles } from './shared';

export namespace JudgeErrorLabel {
  export interface Props extends LabelStyles {
    error: JudgeError;
  }
}
export const JudgeErrorLabel: React.FC<JudgeErrorLabel.Props> = (props) => {
  const { error } = props;
  let message;
  switch (error.type) {
    case JudgeErrorType.TEST_OUTPUT_JUDGER_ERROR:
      message = 'Lỗi trình chấm';
      break;
    default:
      message = 'System error';
  }
  return <ErrorLabel message={message} />;
};
