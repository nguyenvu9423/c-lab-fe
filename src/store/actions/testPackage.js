import { createActions } from 'redux-actions';

const { fetchTestPackages } = createActions({
  fetchTestPackages: {
    request: undefined,
    response: undefined
  }
});

export { fetchTestPackages };
