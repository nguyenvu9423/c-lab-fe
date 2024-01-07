import { JudgeType } from '@/domains/judge-config/JudgeConfig';

export interface JudgeConfigDTO {
  timeLimit: number;

  memoryLimit: number;

  judgeType: JudgeType;
}
