import { JudgerType, ScoringType } from './JudgeConfig';

export interface JudgeConfigDTO {
  timeLimit: number;

  memoryLimit: number;

  scoringType: ScoringType;
}
