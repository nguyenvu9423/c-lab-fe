import { createActions } from 'redux-actions';
import { defaultCreators } from './shared';

const {
  fetchSubmissions,
  fetchSubmissionsByProblem,
  fetchSubmissionDetailsById,
  fetchDetailedSubmission,
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
  fetchDetailedSubmission: {
    request: defaultCreators,
    response: defaultCreators
  },
  createSubmission: {
    request: undefined,
    response: submissionId => ({ submissionId })
  }
});

const { fetchDetailedResult, clearDetailedResult } = createActions({
  fetchDetailedResult: {
    request: defaultCreators,
    response: defaultCreators
  },
  clearDetailedResult: defaultCreators
});

export {
  fetchSubmissions,
  fetchSubmissionsByProblem,
  fetchSubmissionDetailsById,
  fetchDetailedSubmission,
  createSubmission,
  fetchDetailedResult,
  clearDetailedResult
};
