import { createActions } from 'redux-actions';

const {
  fetchSubmissionsByUserAndProblem,
  fetchSubmissionsByProblem,
  fetchSubmissionDetailsById,
  createSubmission
} = createActions({
  fetchSubmissionsByUserAndProblem: {
    request: (
      userId,
      problemId,
      pageable = { pageNumber: 0, pageSize: 10 }
    ) => ({ userId, problemId, pageable }),
    response: undefined
  },
  fetchSubmissionsByProblem: {
    request: (problemId, filters, pageable) => ({
      problemId,
      filters,
      pageable
    }),
    response: undefined
  },
  fetchSubmissionDetailsById: {
    request: submissionId => ({ submissionId }),
    response: submissionId => ({ submissionId })
  },
  createSubmission: {
    request: undefined,
    response: submissionId => ({ submissionId })
  }
});

export {
  fetchSubmissionsByUserAndProblem,
  fetchSubmissionsByProblem,
  fetchSubmissionDetailsById,
  createSubmission
};
