import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import {
  tagsReducer,
  articlesReducer,
  problemsReducer,
  usersReducer
} from '../data-reducers';

import { createTargetChecker, Target } from '../target';

export const adminPageReducer = combineReducers({
  tag: filterActions(
    combineReducers({
      data: combineReducers({ tags: tagsReducer })
    }),
    createTargetChecker(Target.ADMIN_PAGE.TAG)
  ),
  article: filterActions(
    combineReducers({
      data: combineReducers({ articles: articlesReducer })
    }),
    createTargetChecker(Target.ADMIN_PAGE.ARTICLE)
  ),
  problem: filterActions(
    combineReducers({
      data: combineReducers({ problems: problemsReducer })
    }),
    createTargetChecker(Target.ADMIN_PAGE.PROBLEM)
  ),
  user: filterActions(
    combineReducers({
      data: combineReducers({
        users: usersReducer
      })
    }),
    createTargetChecker(Target.ADMIN_PAGE.USER)
  )
});
