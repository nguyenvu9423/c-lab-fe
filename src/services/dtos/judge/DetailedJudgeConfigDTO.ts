import { TestJudgeType } from '@/domains/judge-config';
import { CustomTestJudger } from '@/domains/judge-config/custom-judger';
import { JudgeConfigDTO } from './JudgeConfigDTO';
import { TestPackage } from '@/domains/judge-config/test-package';

export interface DetailedJudgeConfigDTO extends JudgeConfigDTO {
  testJudgeType: TestJudgeType;

  testPackage: TestPackage;

  customTestJudger: CustomTestJudger;
}
