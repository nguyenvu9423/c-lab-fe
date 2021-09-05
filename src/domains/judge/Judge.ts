import { JudgeConfig } from '../judge-config';
import {
  JudgeProgress,
  TypedJudgeProgress,
  JudgeProgressStatus,
} from './judge-progress';
import { JudgeResult, Resource } from './judge-result';

export interface Judge {
  id: number;

  submission: number;

  config: JudgeConfig;

  progress: JudgeProgress;

  result?: JudgeResult;
}

export interface InProgressJudge extends Judge {
  progress: TypedJudgeProgress<
    | JudgeProgressStatus.INITIALIZING
    | JudgeProgressStatus.COMPILING
    | JudgeProgressStatus.IN_QUEUE
    | JudgeProgressStatus.RUNNING_TEST
    | JudgeProgressStatus.TESTING
  >;

  result: undefined;
}

export namespace InProgressJudge {
  export function isInstance(judge: Judge): judge is InProgressJudge {
    return JudgeProgressStatus.InProgressValues.some(
      (value) => value === judge.progress.status
    );
  }
}

export interface SuccessJudge extends Judge {
  progress: TypedJudgeProgress<JudgeProgressStatus.SUCCESS>;

  result: JudgeResult;
}

export namespace SuccessJudge {
  export function isInstance(judge: Judge): judge is SuccessJudge {
    return judge.progress.status === JudgeProgressStatus.SUCCESS;
  }
}

export interface SystemErrorJudge extends Judge {
  progress: TypedJudgeProgress<JudgeProgressStatus.ERROR>;

  result: undefined;
}

export namespace SystemErrorJudge {
  export function isInstance(judge: Judge): judge is SystemErrorJudge {
    return judge.progress.status === JudgeProgressStatus.ERROR;
  }
}

export interface DetailedJudge extends Judge {
  id: number;

  detailedResult: DetailedJudgeResult;
}

export interface DetailedJudgeResult {
  message: string;

  testResults: DetailedTestResult[];
}

export interface DetailedTestResult {
  test: Test;

  outputOverview: string;

  resource: Resource;

  score: number;
}

export interface Test {
  id: number;

  name: string;

  input: {
    path: string;

    overview: string;
  };

  output: {
    path: string;

    overview: string;
  };
}
