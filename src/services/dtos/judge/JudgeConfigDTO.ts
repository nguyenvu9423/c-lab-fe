import { ScoringType } from '@/domains/judge-config/JudgeConfig';

export interface JudgeConfigDTO {
  timeLimit: number;

  memoryLimit: number;

  scoringType: ScoringType;
}
