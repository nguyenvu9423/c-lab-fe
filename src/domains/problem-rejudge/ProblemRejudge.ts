import { ProblemRejudgeProgress } from './problem-rejudge-progress';

export interface ProblemRejudge {
  id: number;

  progress: ProblemRejudgeProgress;

  error: {
    message: string;
  };

  total: number;
}
