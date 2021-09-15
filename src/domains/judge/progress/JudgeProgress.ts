import { JudgeProgressStatus } from './JudgeProgresStatus';

export interface JudgeProgress {
  status: JudgeProgressStatus;

  runningTest: number;
}

export interface TypedJudgeProgress<T extends JudgeProgressStatus>
  extends JudgeProgress {
  status: T;
  runningTest: number;
}
