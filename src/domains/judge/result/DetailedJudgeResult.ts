import { DetailedTestResult } from '../test';
import { JudgeResult } from './JudgeResult';

export interface DetailedJudgeResult extends JudgeResult {
  message: string;

  testResults: DetailedTestResult[];
}
