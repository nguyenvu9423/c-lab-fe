import { createActions } from 'redux-actions';

const { search } = createActions({
  search: {
    request: searchString => ({ searchString }),
    response: undefined
  }
});

export { search };
