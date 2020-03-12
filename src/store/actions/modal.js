import { createActions } from 'redux-actions';

const { requestModal, showModal, hideModal } = createActions({
  requestModal: {
    request: undefined,
    response: undefined
  },
  showModal: undefined,
  hideModal: undefined
});

export { requestModal, showModal, hideModal };
