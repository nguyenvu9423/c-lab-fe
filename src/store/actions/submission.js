import { createActions } from 'redux-actions';

const {
  fetchSubmissions,
  fetchSubmissionsByUserAndProblem,
  fetchSubmissionsByProblem,
  fetchSubmissionDetailsById,
  fetchSubmissionResultLog,
  fetchDetailedSubmissionById,
  createSubmission
} = createActions({
  fetchSubmissions: {
    request: [payload => payload, (payload, meta) => meta],
    response: [payload => payload, (payload, meta) => meta]
  },
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
  fetchSubmissionResultLog: {
    request: submissionId => ({ submissionId }),
    response: resultLog => ({ resultLog })
  },
  fetchDetailedSubmissionById: {
    request: submissionId => ({ submissionId }),
    response: undefined
  },
  createSubmission: {
    request: undefined,
    response: submissionId => ({ submissionId })
  }
});

export {
  fetchSubmissions,
  fetchSubmissionsByUserAndProblem,
  fetchSubmissionsByProblem,
  fetchSubmissionDetailsById,
  fetchSubmissionResultLog,
  fetchDetailedSubmissionById,
  createSubmission
};
