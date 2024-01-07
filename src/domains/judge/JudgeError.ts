export interface JudgeError {
  type: JudgeErrorType;

  message: string;
}

export enum JudgeErrorType {
  TEST_OUTPUT_JUDGER_ERROR = 'TEST_OUTPUT_JUDGER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
