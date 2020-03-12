import {
  SubmissionStatusType,
  ProgressStatusType
} from '../../domains/submission/components';

const submissionStatusParser = {
  parse(submission) {
    let status, message;
    const { progress, result } = submission;
    const { progressStatus, currentTest } = progress;
    if (progressStatus.inProgress) {
      status = SubmissionStatusType.IN_PROGRESS;
      if (progressStatus.name === ProgressStatusType.RUNNING) {
        message = `Running on test ${currentTest}`;
      } else {
        message = progressStatus.description;
      }
    } else {
      if (progressStatus.name === ProgressStatusType.DONE) {
        if (!result.error) {
          status = SubmissionStatusType.ACCEPTED;
          message = 'Accepted';
        } else {
          const { error } = result;
          status = SubmissionStatusType.ERROR;
          message = `${error.status.description} on test ${error.testId}`;
        }
      } else {
        status = SubmissionStatusType.ERROR;
        message = progressStatus.description;
      }
    }
    return { status, message };
  }
};

export { submissionStatusParser };
