import { ContestJudgeType } from '@/domains/contest';

export interface UpdateContestJudgeConfigDto {
  type: ContestJudgeType;

  problemConfigs: Array<{
    code: string;

    score: number;

    problemId: number;
  }>;
}
