import { createActions } from 'redux-actions';

const {
  fetchProblems,
  fetchProblem,
  fetchProblemById,
  fetchProblemByCode,
  updateProblem
} = createActions({
  fetchProblems: {
    request: payload => (payload ? payload : {}),
    response: undefined
  },
  fetchProblem: {
    request: undefined,
    response: [payload => payload, (payload, meta) => meta]
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
