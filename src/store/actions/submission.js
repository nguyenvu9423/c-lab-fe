import { createActions } from 'redux-actions';

const {
  fetchSubmissions,
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
  fetchSubmissionsByProblem,
  fetchSubmissionDetailsById,
  fetchSubmissionResultLog,
  fetchDetailedSubmissionById,
  createSubmission
};
