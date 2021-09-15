import { JudgeDTO } from './JudgeDTO';
import { DetailedJudgeResult } from '../result';

export interface DetailedJudgeDTO extends JudgeDTO {
  detailedResult: DetailedJudgeResult;
}
