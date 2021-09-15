import { Judge } from './Judge';
import { DetailedJudgeResult } from './result';

export interface DetailedJudge extends Judge {
  id: number;

  detailedResult: DetailedJudgeResult;
}
