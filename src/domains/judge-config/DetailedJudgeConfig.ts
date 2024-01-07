import { CustomTestJudger } from './custom-judger';
import { TestPackage } from './test-package';
import { JudgeConfig, TestJudgeType } from './JudgeConfig';

export interface DetailedJudgeConfig extends JudgeConfig {
  testJudgeType: TestJudgeType;

  testPackage: TestPackage;

  customTestJudger: CustomTestJudger;
}
