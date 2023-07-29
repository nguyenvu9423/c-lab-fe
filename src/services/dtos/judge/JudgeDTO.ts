import { JudgeResult } from '@/domains/judge';
import { SubmissionDTO } from '../submission';
import { JudgeConfigDTO } from './JudgeConfigDTO';

export interface JudgeDTO {
  id: number;

  submission: SubmissionDTO;

  config: JudgeConfigDTO;

  result: JudgeResult;
}
