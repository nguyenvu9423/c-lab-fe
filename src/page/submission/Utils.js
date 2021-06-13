import {
  SubmissionProgressType,
  SubmissionProgressStatus,
} from '../../domains/submission';

const submissionStatusParser = {
  parse(submission) {
    let output = {};
    const { progress, result } = submission;
    const { status, runningTest } = progress;
    output.status = status.type;

    if (output.status === SubmissionProgressType.IN_PROGRESS) {
      if (status.name === SubmissionProgressStatus.RUNNING) {
        output.message = `Running on test ${runningTest}`;
      } else {
        output.message = status.description;
      }
    } else {
      if (status.name === SubmissionProgressStatus.DONE) {
        if (!result.error) {
          output.status = SubmissionProgressType.SUCCESS;
          output.message = 'Accepted';
        } else {
          const { error } = result;
          output.status = SubmissionProgressType.ERROR;
          output.message = `${error.status.description} on test ${error.testId}`;
        }
      } else {
        output.status = SubmissionProgressType.ERROR;
        output.message = status.description;
      }
    }
    return output;
  },
};

export { submissionStatusParser };
