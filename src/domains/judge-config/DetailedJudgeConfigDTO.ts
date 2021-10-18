import { JudgerType } from '.';
import { CustomJudger } from './custom-judger';
import { JudgeConfigDTO } from './JudgeConfigDTO';
import { TestPackage } from './test-package';

export interface DetailedJudgeConfigDTO extends JudgeConfigDTO {
  judgerType: JudgerType;

  testPackage: TestPackage;

  customJudger: CustomJudger;
}
