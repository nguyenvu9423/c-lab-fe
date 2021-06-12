export const ProblemRejudgeStatus = {
  IN_QUEUE: 'IN_QUEUE',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESSFUL: 'SUCCESSFUL',
  ERROR: 'ERROR',

  isInProgress(status) {
    return status === this.IN_QUEUE || status === this.IN_PROGRESS;
  }
};
