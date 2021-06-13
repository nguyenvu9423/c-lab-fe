import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';

import { Target, createTargetChecker } from '../target';
import { articlesReducer } from '../data-reducers';

const isWithTarget = createTargetChecker(Target.ARTICLES_PAGE);
export const articlesPageReducer = filterActions(
  combineReducers({
    data: combineReducers({
      articles: articlesReducer,
    }),
  }),
  isWithTarget
);
