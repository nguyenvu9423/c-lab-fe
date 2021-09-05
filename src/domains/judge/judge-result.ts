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

export namespace TestVerdict {
  export const values = [
    TestVerdict.AC,
    TestVerdict.WA,
    TestVerdict.TLE,
    TestVerdict.MLE,
    TestVerdict.OLE,
    TestVerdict.RE,
  ];

  export function getMessage(verdict: TestVerdict): string {
    switch (verdict) {
      case TestVerdict.AC:
        return 'Accepted';
      case TestVerdict.WA:
        return 'Wrong answer';
      case TestVerdict.TLE:
        return 'TLE';
      case TestVerdict.MLE:
        return 'MLE';
      case TestVerdict.OLE:
        return 'OLE';
      case TestVerdict.RE:
        return 'Runtime error';
    }
  }
}

export interface Resource {
  time: number;

  memory: number;
}
