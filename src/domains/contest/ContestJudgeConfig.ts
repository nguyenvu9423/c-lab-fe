import { ContestJudgeType } from './ContestJudgeType';
import { ContestProblemConfig } from './ContestProblemConfig';

export interface ContestJudgeConfig {
  id: number;

  type: ContestJudgeType;

  problemConfigs: ContestProblemConfig[];
}
