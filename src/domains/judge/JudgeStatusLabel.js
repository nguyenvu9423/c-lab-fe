import * as React from 'react';
import { useSelector } from 'react-redux';
import { JudgeProgressType } from '.';
import { JudgeResultLabel } from './JudgeResultLabel';
import { JudgeInProgressLabel } from './JudgeInProgressLabel';
import { JudgeErrorLabel } from './JudgeErrorLabel';
import { JudgeSelectors } from '../../store/selectors/JudgeSelectors';

export function JudgeStatusLabel(props) {
  const { judgeId } = props;
  const judge = useSelector(JudgeSelectors.byId(judgeId));

  const {
    progress,
    result,
    config: { scoringType },
  } = judge;

  switch (progress.status.type) {
    case JudgeProgressType.IN_PROGRESS:
      return <JudgeInProgressLabel progress={progress} />;
    case JudgeProgressType.SUCCESS:
      return <JudgeResultLabel result={result} scoringType={scoringType} />;
    case JudgeProgressType.ERROR:
      return <JudgeErrorLabel progress={progress} />;
    default:
      throw new Error('Invalid submission verdict');
  }
}
