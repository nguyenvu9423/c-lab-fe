import { ProblemRejudge } from '../problem-rejudge';

export interface ContestProblemRejudge extends ProblemRejudge {
  contest: number;
}
