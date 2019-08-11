import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { entityReducer } from './entityReducer';
import { articleReducer } from './articleReducer';
import { articleOverviewReducer } from './articleOverviewReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  entities: entityReducer,
  article: articleReducer,
  articleOverview: articleOverviewReducer
});

export { rootReducer };
