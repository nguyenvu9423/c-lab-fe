export interface JudgeProgress {
  status: JudgeProgressStatus;

  runningTest: number;
}

export interface TypedJudgeProgress<T extends JudgeProgressStatus>
  extends JudgeProgress {
  status: T;
  runningTest: number;
}

export enum JudgeProgressStatus {
  IN_QUEUE = 'IN_QUEUE',
  INITIALIZING = 'INITIALIZING',
  COMPILING = 'COMPILING',
  TESTING = 'TESTING',
  RUNNING_TEST = 'RUNNING_TEST',

  SUCCESS = 'SUCCESS',

  ERROR = 'ERROR',
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
