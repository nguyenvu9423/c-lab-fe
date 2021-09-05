import { ProblemRejudgeProgress } from './problem-rejudge-progress';

export interface ProblemRejudgeDTO {
  id: number;

  progress: ProblemRejudgeProgress;

  error: {
    message: string;
  };

  total: number;
}
