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

  export function getMessage(verdict: TestVerdict, compact?: boolean): string {
    switch (verdict) {
      case TestVerdict.AC:
        return 'Accepted';
      case TestVerdict.WA:
        return 'WA';
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
