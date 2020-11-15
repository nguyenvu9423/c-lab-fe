import * as React from 'react';
import { SubmissionProgressType } from '../../../domains/submission';
import { SubmissionVerdict } from '../../../domains/submission/result/SubmissionVerdict';
import {
  LoadingStatusLabel,
  ErrorStatusLabel,
  AcceptedStatusLabel
} from './status-labels';
import { SubmissionTestResultLabel } from './test-result-labels';

function SubmissionStatusLabel(props) {
  const {
    submission: { progress, result }
  } = props;
  const { status } = progress;
  switch (status.type) {
    case SubmissionProgressType.IN_PROGRESS:
      return <LoadingStatusLabel message={progress.description} />;
    case SubmissionProgressType.SUCCESS:
      if (SubmissionVerdict.COMPILE_ERROR.isInstance(result.verdict)) {
        return <ErrorStatusLabel message="Compile error" />;
      } else if (SubmissionVerdict.ACCEPTED.isInstance(result.verdict)) {
        return <AcceptedStatusLabel message={'Accepted'} />;
      } else if (SubmissionVerdict.TEST_ERROR.isInstance(result.verdict)) {
        return <SubmissionTestResultLabel testResult={result.testError} />;
      } else {
        throw new Error('Invalid status');
      }
    case SubmissionProgressType.ERROR:
      return <ErrorStatusLabel message={progress.description} />;
    default:
      throw new Error('Invalid submission verdict');
  }
}

export { SubmissionStatusLabel };
