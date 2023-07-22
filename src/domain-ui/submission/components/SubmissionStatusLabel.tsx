import * as React from 'react';
import { ErrorLabel, JudgeStatusLabel } from '../../judge';
import { Submission } from '@/domains/submission';

export namespace SubmissionStatusLabel {
  export interface Props {
    submission: Submission;
    compact?: boolean;
  }
}

export const SubmissionStatusLabel: React.FC<SubmissionStatusLabel.Props> = (
  props
) => {
  const { submission, compact } = props;
  if (submission.disqualified) {
    return <ErrorLabel message="Disqualified" />;
  } else {
    return <JudgeStatusLabel judgeId={submission.judge} compact={compact} />;
  }
};
