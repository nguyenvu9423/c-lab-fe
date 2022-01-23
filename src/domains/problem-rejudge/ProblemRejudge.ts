import { ProblemRejudgeProgress } from './problem-rejudge-progress';
import { ProblemRejudgeResult } from './ProblemRejudgeResult';

export interface ProblemRejudge {
  id: number;

  progress: ProblemRejudgeProgress;

  result: ProblemRejudgeResult;

  error: {
    message: string;
  };

  total: number;
}
