import * as React from 'react';
import { useSelector } from 'react-redux';
import { JudgeResultLabel } from './JudgeResultLabel';
import { JudgeInProgressLabel } from './JudgeInProgressLabel';
import { JudgeErrorLabel } from './JudgeErrorLabel';
import { JudgeSelectors } from '../../store/selectors/JudgeSelectors';
import { SuccessJudge, SystemErrorJudge, InProgressJudge } from './Judge';

export const JudgeStatusLabel: React.FC<{ judgeId: number }> = (props) => {
  const { judgeId } = props;
  const judge = useSelector(JudgeSelectors.byId(judgeId));

  if (!judge) return null;

  const { progress, config } = judge;

  if (SuccessJudge.isInstance(judge)) {
    return (
      <JudgeResultLabel
        result={judge.result}
        scoringType={config.scoringType}
      />
    );
  } else if (SystemErrorJudge.isInstance(judge)) {
    return <JudgeErrorLabel progress={progress} />;
  } else if (InProgressJudge.isInstance(judge)) {
    return <JudgeInProgressLabel progress={progress} />;
  } else {
    return null;
  }
};
