import * as React from 'react';
import { useSelector } from 'react-redux';
import { JudgeResultLabel } from './JudgeResultLabel';
import { JudgeInProgressLabel } from './JudgeInProgressLabel';
import { JudgeErrorLabel } from './JudgeErrorLabel';
import { JudgeSelectors } from '../../../store/selectors/JudgeSelectors';
import { SuccessJudge, SystemErrorJudge, InProgressJudge } from '../Judge';
import { CancelledJudge } from '../Judge';
import { ErrorLabel } from './ui-labels';
import { LabelStyles } from './shared';
import { RejectedJudge } from '..';

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
        scoringType={config.scoringType}
      />
    );
  } else if (SystemErrorJudge.isInstance(judge)) {
    return <JudgeErrorLabel compact={compact} progress={progress} />;
  } else if (CancelledJudge.isInstance(judge)) {
    return <ErrorLabel message="Cancelled" />;
  } else if (RejectedJudge.isInstance(judge)) {
    return <ErrorLabel message="Rejected" />;
  } else {
    return null;
  }
};
