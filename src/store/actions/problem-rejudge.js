import { createActions } from 'redux-actions';
import { defaultCreators } from './shared';

const { fetchProblemRejudge } = createActions({
  fetchProblemRejudge: {
    request: defaultCreators,
    response: defaultCreators
  }
});

export { fetchProblemRejudge };
