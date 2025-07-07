import { SubmissionDTO } from './SubmissionDTO';

export interface UserProblemResultDto {
  userId: number;

  problemId: number;

  bestSubmission: SubmissionDTO;
}
