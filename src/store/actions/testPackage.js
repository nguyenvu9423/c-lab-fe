import { createActions } from 'redux-actions';

const { fetchTestPackages, fetchTestPackagesByOwningProblem } = createActions({
  fetchTestPackagesByOwningProblem: {
    request: (problemId, pageable) => ({ problemId, pageable })
  },
  fetchTestPackages: {
    response: undefined
  }
});

export { fetchTestPackages, fetchTestPackagesByOwningProblem };
