import * as React from 'react';
import { submissionStatusParser } from '../Utils';
import SubmissionLoadingStatusLabel from './SubmissionLoadingStatusLabel';
import SubmissionAcceptedStatusLabel from './SubmissionAcceptedStatusLabel';
import SubmissionErrorStatusLabel from './SubmissionErrorStatusLabel';
import { SubmissionStatusType } from '../../../domains/submission/components';

function SubmissionStatusLabel(props) {
  const { submission } = props;
  const { status, message } = submissionStatusParser.parse(submission);
  const Component = componentMap[status];
  return <Component message={message} />;
}

const componentMap = {
  [SubmissionStatusType.IN_PROGRESS]: SubmissionLoadingStatusLabel,
  [SubmissionStatusType.ACCEPTED]: SubmissionAcceptedStatusLabel,
  [SubmissionStatusType.ERROR]: SubmissionErrorStatusLabel
};

export { SubmissionStatusLabel };
