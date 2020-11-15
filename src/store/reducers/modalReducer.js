import { handleActions } from 'redux-actions';
import { showModal, hideModal } from '../actions';

const initialState = {
  modalType: undefined,
  modalProps: undefined
};

const modalReducer = handleActions(
  {
    [showModal]: (state, action) => {
      const { modalType, modalProps } = action.payload;
      return { modalType, modalProps };
    },
    [hideModal]: () => initialState
  },
  initialState
);

export { modalReducer };
