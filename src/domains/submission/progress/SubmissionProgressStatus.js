export const SubmissionInProgressStatus = {
  IN_QUEUE: 'IN_QUEUE',
  INITIALIZING: 'INITIALIZING',
  COMPILING: 'COMPILING',
  TESTING: 'TESTING',
  RUNNING_TEST: 'RUNNING_TEST'
};

export const SubmissionSuccessStatus = {
  SUCCESS: 'SUCCESS'
};

export const SubmissionErrorStatus = {
  SYSTEM_ERROR: 'SYSTEM_ERROR'
};

export const SubmissionProgressStatus = {
  ...SubmissionInProgressStatus,
  ...SubmissionSuccessStatus,
  ...SubmissionErrorStatus
};
