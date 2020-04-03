import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';

const initialState = {
  ids: [],
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined,
  totalPages: 0,
  activePage: 0
};

const submissionsReducer = handleActions({}, initialState);
