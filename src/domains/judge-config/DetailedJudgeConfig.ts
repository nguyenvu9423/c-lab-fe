import { CustomJudger } from './custom-judger';
import { TestPackage } from './test-package';
import { JudgeConfig, JudgerType } from './JudgeConfig';

export interface DetailedJudgeConfig extends JudgeConfig {
  judgerType: JudgerType;

  testPackage: TestPackage;

  customJudger: CustomJudger;
}
