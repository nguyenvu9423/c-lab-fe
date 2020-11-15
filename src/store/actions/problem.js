import { createActions } from 'redux-actions';
import * as uuid from 'uuid';
import { defaultCreators } from './shared';

const {
  fetchProblems,
  fetchProblem,
  fetchProblemById,
  fetchProblemByCode,
  updateProblem
} = createActions({
  fetchProblems: {
    request: [
      payload => ({
        ...payload,
        query: payload.query ? payload.query : undefined
      }),
      (payload, meta) => ({ ...meta, requestId: uuid.v4() })
    ],
    response: defaultCreators
  },
  fetchProblem: {
    request: defaultCreators,
    response: defaultCreators
  },
  fetchProblemById: {
    request: [id => ({ params: { id } }), (id, meta) => meta]
  },
  fetchProblemByCode: {
    request: [code => ({ params: { code } }), (code, meta) => meta]
  },
  updateProblem: {
    request: (id, problem) => ({ id, problem }),
    response: undefined
  }
});

export {
  fetchProblem,
  fetchProblemById,
  fetchProblemByCode,
  fetchProblems,
  updateProblem
};
