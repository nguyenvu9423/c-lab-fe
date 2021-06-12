export const JudgeInProgressStatus = {
  IN_QUEUE: 'IN_QUEUE',
  INITIALIZING: 'INITIALIZING',
  COMPILING: 'COMPILING',
  TESTING: 'TESTING',
  RUNNING_TEST: 'RUNNING_TEST'
};

export const JudgeSuccessStatus = {
  SUCCESS: 'SUCCESS'
};

export const JudgeErrorStatus = {
  SYSTEM_ERROR: 'SYSTEM_ERROR'
};

export const JudgeProgressStatus = {
  ...JudgeInProgressStatus,
  ...JudgeSuccessStatus,
  ...JudgeErrorStatus
};
