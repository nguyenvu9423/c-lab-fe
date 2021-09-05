import {
  CustomJudger,
  JudgerType,
  ScoringType,
  TestPackage,
} from './JudgeConfig';

export interface JudgeConfigDTO {
  timeLimit: number;

  memoryLimit: number;

  judgerType: JudgerType;

  scoringType: ScoringType;

  testPackage: TestPackage;

  customJudger: CustomJudger;
}
