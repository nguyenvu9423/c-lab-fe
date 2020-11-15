import { createActions } from 'redux-actions';

const { showModal, hideModal } = createActions({
  showModal: undefined,
  hideModal: undefined
});

export { showModal, hideModal };
