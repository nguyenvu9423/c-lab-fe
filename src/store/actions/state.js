import { createActions } from 'redux-actions';

const { resetState } = createActions({
  resetState: [meta => ({}), meta => meta]
});

export { resetState };
