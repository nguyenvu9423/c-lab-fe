import { ProblemRejudgeProgress } from '@/domains/problem-rejudge';

export interface ProblemRejudgeDTO {
  id: number;

  progress: ProblemRejudgeProgress;

  error: {
    message: string;
  };

  total: number;
}
