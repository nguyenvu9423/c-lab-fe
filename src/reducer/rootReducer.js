import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { entityReducer } from './entityReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  entities: entityReducer
});

export { rootReducer };
