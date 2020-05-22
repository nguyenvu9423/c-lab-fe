import { createActions } from 'redux-actions';

const { resetState } = createActions({
  resetState: [undefined, meta => meta]
});

export { resetState };
