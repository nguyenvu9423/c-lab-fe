import { Resource } from '../Resource';
import { TestResult } from '../test';
import { JudgeVerdict } from './JudgeVerdict';

export interface JudgeResult {
  verdict: JudgeVerdict;

  testError?: TestResult;

  resource?: Resource;

  score?: number;
}
