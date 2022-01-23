export interface ProblemRejudgeProgress {
  status: ProblemRejudgeStatus;

  doneCount: number;
}

export enum ProblemRejudgeStatus {
  IN_QUEUE = 'IN_QUEUE',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESSFUL = 'SUCCESSFUL',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
  ERROR = 'ERROR',
}

export namespace ProblemRejudgeStatus {
  export function isInProgress(status: ProblemRejudgeStatus): boolean {
    return status === this.IN_QUEUE || status === this.IN_PROGRESS;
  }
}
