import { createActions } from 'redux-actions';

const { fetchAllCodeLanguages } = createActions({
  fetchAllCodeLanguages: {
    request: undefined,
    response: undefined
  }
});

export { fetchAllCodeLanguages };
