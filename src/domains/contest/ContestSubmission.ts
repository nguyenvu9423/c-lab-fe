import { Submission } from '../submission';

export interface ContestSubmission extends Submission {
  contestId: number;
}
