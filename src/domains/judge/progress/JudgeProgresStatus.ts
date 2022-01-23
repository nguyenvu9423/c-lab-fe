export enum JudgeProgressStatus {
  IN_QUEUE = 'IN_QUEUE',
  INITIALIZING = 'INITIALIZING',
  COMPILING = 'COMPILING',
  TESTING = 'TESTING',
  RUNNING_TEST = 'RUNNING_TEST',

  SUCCESS = 'SUCCESS',
  CANCELLED = 'CANCELLED',
  ERROR = 'ERROR',
  REJECTED = 'REJECTED',
}

export namespace JudgeProgressStatus {
  export const InProgressValues = [
    JudgeProgressStatus.IN_QUEUE,
    JudgeProgressStatus.INITIALIZING,
    JudgeProgressStatus.COMPILING,
    JudgeProgressStatus.TESTING,
    JudgeProgressStatus.RUNNING_TEST,
  ];
}
