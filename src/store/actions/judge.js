import { createActions } from 'redux-actions';
import { defaultCreators } from './shared';

const { fetchJudge, fetchDetailedJudge } = createActions({
  fetchJudge: {
    request: defaultCreators,
    response: defaultCreators
  },
  fetchDetailedJudge: {
    request: defaultCreators,
    response: defaultCreators
  },
  clearDetailedJudge: defaultCreators
});

export { fetchJudge, fetchDetailedJudge };
