import { JudgeConfigDTO } from '../../judge-config/JudgeConfigDTO';
import { SubmissionDTO } from '../../submission';
import { JudgeResult } from '../result';

export interface JudgeDTO {
  id: number;

  submission: SubmissionDTO;

  config: JudgeConfigDTO;

  result: JudgeResult;
}
