import { userEntityReducer } from './userReducer';
import { articleEntityReducer } from './articleEntityReducer';
import { combineReducers } from 'redux';

const entityReducer = combineReducers({
  user: userEntityReducer,
  article: articleEntityReducer
});

export { entityReducer };
