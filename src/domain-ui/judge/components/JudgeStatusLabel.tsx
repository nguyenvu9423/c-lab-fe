import * as React from 'react';
import { useSelector } from 'react-redux';
import { JudgeResultLabel } from './JudgeResultLabel';
import { JudgeInProgressLabel } from './JudgeInProgressLabel';
import { JudgeErrorLabel } from './JudgeErrorLabel';
import { JudgeSelectors } from '@/store/selectors/JudgeSelectors';
import {
  SuccessJudge,
  ErrorJudge,
  InProgressJudge,
  CancelledJudge,
  RejectedJudge,
} from '@/domains/judge';
import { ErrorLabel } from './ui-labels';
import { LabelStyles } from './shared';

export namespace JudgeStatusLabel {
  export interface Props extends LabelStyles {
    judgeId: number;
  }
}

export const JudgeStatusLabel: React.FC<JudgeStatusLabel.Props> = (props) => {
  const { judgeId, compact } = props;
  const judge = useSelector(JudgeSelectors.byId(judgeId));

  if (!judge) return null;

  const { progress, config } = judge;
  if (InProgressJudge.isInstance(judge)) {
    return <JudgeInProgressLabel compact={compact} progress={progress} />;
  } else if (SuccessJudge.isInstance(judge)) {
    return (
      <JudgeResultLabel
        compact={compact}
        result={judge.result}
        judgeType={config.judgeType}
      />
    );
  } else if (ErrorJudge.isInstance(judge)) {
    return <JudgeErrorLabel compact={compact} error={judge.error} />;
  } else if (CancelledJudge.isInstance(judge)) {
    return <ErrorLabel message="Cancelled" />;
  } else if (RejectedJudge.isInstance(judge)) {
    return <ErrorLabel message="Rejected" />;
  } else {
    return null;
  }
};
