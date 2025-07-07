import { SubmissionDTO } from '../submission';

export interface ContestSubmissionDto extends SubmissionDTO {
  contestId: number;
}
