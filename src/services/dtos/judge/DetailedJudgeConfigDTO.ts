import { JudgerType } from '@/domains/judge-config';
import { CustomJudger } from '@/domains/judge-config/custom-judger';
import { JudgeConfigDTO } from './JudgeConfigDTO';
import { TestPackage } from '@/domains/judge-config/test-package';

export interface DetailedJudgeConfigDTO extends JudgeConfigDTO {
  judgerType: JudgerType;

  testPackage: TestPackage;

  customJudger: CustomJudger;
}
