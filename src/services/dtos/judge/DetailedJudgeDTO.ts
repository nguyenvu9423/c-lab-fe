import { JudgeDTO } from './JudgeDTO';
import { DetailedJudgeResult } from '@/domains/judge/result';

export interface DetailedJudgeDTO extends JudgeDTO {
  detailedResult: DetailedJudgeResult;
}
