export const TestVerdict = {
  AC: 'AC',
  WA: 'WA',
  TLE: 'TLE',
  MLE: 'MLE',
  OLE: 'OLE',
  RE: 'RE',
  getMessage: verdict => {
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
};
