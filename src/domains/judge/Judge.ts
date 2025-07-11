import { JudgeConfig } from '../judge-config';
import { JudgeError } from './JudgeError';
import {
  JudgeProgress,
  TypedJudgeProgress,
  JudgeProgressStatus,
} from './progress';
import { JudgeResult } from './result';

export interface Judge {
  id: number;

  submission: number;

  config: JudgeConfig;

  progress: JudgeProgress;

  result?: JudgeResult;

  error?: JudgeError;
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
      (value) => value === judge.progress.status,
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

export interface ErrorJudge extends Judge {
  progress: TypedJudgeProgress<JudgeProgressStatus.ERROR>;

  result: undefined;

  error: JudgeError;
}

export namespace ErrorJudge {
  export function isInstance(judge: Judge): judge is ErrorJudge {
    return judge.progress.status === JudgeProgressStatus.ERROR;
  }
}

export namespace CancelledJudge {
  export function isInstance(judge: Judge): boolean {
    return judge.progress.status === JudgeProgressStatus.CANCELLED;
  }
}

export namespace RejectedJudge {
  export function isInstance(judge: Judge): boolean {
    return judge.progress.status === JudgeProgressStatus.REJECTED;
  }
}
