import { Resource } from '../Resource';
import { Test } from './Test';
import { TestVerdict } from './TestVerdict';

export interface TestResult {
  testId: number;

  verdict: TestVerdict;
}

export interface DetailedTestResult extends TestResult {
  test: Test;

  outputOverview: string;

  resource: Resource;

  score: number;
}

export namespace TestResult {
  export function parseMessage(result: TestResult): string {
    const { verdict, testId } = result;
    return `${TestVerdict.getMessage(verdict)} on test ${testId}`;
  }
}
