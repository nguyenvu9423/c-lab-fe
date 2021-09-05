import * as React from 'react';
import { ErrorLabel, JudgeStatusLabel } from '../../judge';
import { Submission } from '../Submission';

export const SubmissionStatusLabel: React.FC<{ submission: Submission }> = (
  props
) => {
  const { submission } = props;
  if (submission.disqualified) {
    return <ErrorLabel message="Disqualified" />;
  } else {
    return <JudgeStatusLabel judgeId={submission.judge} />;
  }
};
