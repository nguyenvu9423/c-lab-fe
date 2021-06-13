import { combineReducers } from 'redux';
import { problemRejudgeReducer } from '../../data-reducers';

const problemRejudgePageReducer = combineReducers({
  data: combineReducers({
    problemRejudge: problemRejudgeReducer,
  }),
});

export { problemRejudgePageReducer };
