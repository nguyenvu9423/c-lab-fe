import { handleActions } from 'redux-actions';
import { showModal, hideModal, requestModal } from '../actions';
import { LoadingState } from '../common';

const initialState = {
  modalType: undefined,
  modalProps: undefined,
  loadingState: undefined,
  error: undefined
};

const modalReducer = handleActions(
  {
    [requestModal.request]: (state, { payload: { modalType } }) => ({
      modalType,
      loadingState: LoadingState.LOADING
    }),
    [requestModal.response]: (state, action) => {
      const { modalType, modalProps } = action.payload;
      return { modalType, modalProps, loadingState: LoadingState.LOADED };
    },
    [showModal]: (state, action) => {
      const { modalType, modalProps } = action.payload;
      return { modalType, modalProps, loadingState: LoadingState.LOADED };
    },
    [hideModal]: () => initialState
  },
  initialState
);

export { modalReducer };
