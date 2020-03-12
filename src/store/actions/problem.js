import { createActions } from 'redux-actions';

const {
  fetchProblems,
  fetchProblem,
  fetchProblemById,
  updateProblem
} = createActions({
  fetchProblems: {
    request: undefined,
    response: undefined
  },
  fetchProblem: {
    request: undefined,
    response: undefined
  },
  fetchProblemById: {
    request: undefined,
    response: undefined
  },
  updateProblem: {
    request: (id, problem) => ({ id, problem }),
    response: undefined
  }
});

export { fetchProblem, fetchProblemById, fetchProblems, updateProblem };
