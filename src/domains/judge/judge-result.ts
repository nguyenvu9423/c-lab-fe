export interface JudgeResult {
  verdict: JudgeVerdict;

  testError?: TestResult;

  resource?: Resource;

  score?: number;
}

export enum JudgeVerdict {
  COMPILE_ERROR = 'COMPILE_ERROR',
  ACCEPTED = 'ACCEPTED',
  TEST_ERROR = 'TEST_ERROR',
}

export interface TestResult {
  testId: number;

  verdict: TestVerdict;
}

export enum TestVerdict {
  AC = 'AC',
  WA = 'WA',
  TLE = 'TLE',
  MLE = 'MLE',
  OLE = 'OLE',
  RE = 'RE',
}

export interface Resource {
  time: number;

  memory: number;
}
