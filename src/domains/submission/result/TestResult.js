import { TestVerdict } from './TestVerdict';

export class TestResult {
  static parseMessage(testResult) {
    const { verdict, testId } = testResult;
    const testVerdict = TestVerdict.valueOf(verdict);
    return `${testVerdict.description} on test ${testId}`;
  }
}
