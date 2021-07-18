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

  SYSTEM_ERROR = 'SYSTEM_ERROR',
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

// export enum JudgeProgressType {
//   IN_PROGRESS = 'IN_PROGRESS',
//   SUCCESS = 'SUCCESS',
//   ERROR = 'ERROR',
// }

// export function getJudgeProgressType(
//   status: JudgeProgressStatus
// ): JudgeProgressType {
//   switch (status) {
//     case JudgeProgressStatus.IN_QUEUE:
//     case JudgeProgressStatus.INITIALIZING:
//     case JudgeProgressStatus.COMPILING:
//     case JudgeProgressStatus.TESTING:
//     case JudgeProgressStatus.RUNNING_TEST:
//       return JudgeProgressType.IN_PROGRESS;
//     case JudgeProgressStatus.SUCCESS:
//       return JudgeProgressType.SUCCESS;
//     case JudgeProgressStatus.SYSTEM_ERROR:
//       return JudgeProgressType.ERROR;
//     default:
//       throw new Error('Could not identify the judge progress status');
//   }
// }
