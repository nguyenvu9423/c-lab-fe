import { createActions } from 'redux-actions';

const { fetchAllSubmissionLangs } = createActions({
  fetchAllSubmissionLangs: {
    request: undefined,
    response: undefined
  }
});

export { fetchAllSubmissionLangs };
