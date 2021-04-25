import * as React from 'react';
import { SubmissionProgressType } from '../../../domains/submission';
import { SubmissionResultLabel } from './SubmissionResultLabel';
import { SubmissionInProgressLabel } from './SubmissionInProgressLabel';
import { SubmissionErrorLabel } from './SubmissionErrorLabel';

export function SubmissionStatusLabel(props) {
  const { submission } = props;
  const {
    progress,
    result,
    judgeConfig: { scoringType }
  } = submission;

  switch (progress.status.type) {
    case SubmissionProgressType.IN_PROGRESS:
      return <SubmissionInProgressLabel progress={progress} />;
    case SubmissionProgressType.SUCCESS:
      return (
        <SubmissionResultLabel result={result} scoringType={scoringType} />
      );
    case SubmissionProgressType.ERROR:
      return <SubmissionErrorLabel progress={progress} />;
    default:
      throw new Error('Invalid submission verdict');
  }
}
