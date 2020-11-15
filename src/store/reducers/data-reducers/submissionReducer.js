import { LoadingState } from '../../common';
import handleActions from 'redux-actions/lib/handleActions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined
};

const submissionReducer = handleActions({}, initialState);

export { submissionReducer };
