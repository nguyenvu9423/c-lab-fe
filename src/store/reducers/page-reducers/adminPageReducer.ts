import { ProblemsState } from './../data-holders/problemsReducer';
import { combineReducers } from 'redux';
import {
  tagsReducer,
  articlesReducer,
  problemsReducer,
  usersReducer,
  rolesReducer,
  RolesState,
  TagsState,
  UsersState,
  ArticlesState,
} from '../data-holders';

import { Target, TargetPredicates } from '../target';
import { createFilteredReducer } from '../utils/createFilteredReducer';

export interface AdminPageState {
  article: {
    data: {
      articles: ArticlesState;
    };
  };
  problem: {
    data: {
      problems: ProblemsState;
    };
  };
  user: {
    data: {
      users: UsersState;
    };
  };
  role: {
    data: {
      roles: RolesState;
    };
  };
  tag: {
    data: {
      tags: TagsState;
    };
  };
}

export const adminPageReducer = combineReducers<AdminPageState>({
  tag: createFilteredReducer(
    combineReducers({
      data: combineReducers({ tags: tagsReducer }),
    }),
    TargetPredicates.equal(Target.AdminPage.TAG)
  ),
  article: createFilteredReducer(
    combineReducers({
      data: combineReducers({ articles: articlesReducer }),
    }),
    TargetPredicates.equal(Target.AdminPage.ARTICLE)
  ),
  problem: createFilteredReducer(
    combineReducers({
      data: combineReducers({ problems: problemsReducer }),
    }),
    TargetPredicates.equal(Target.AdminPage.PROBLEM)
  ),
  user: createFilteredReducer(
    combineReducers({
      data: combineReducers({
        users: usersReducer,
      }),
    }),
    TargetPredicates.equal(Target.AdminPage.USER)
  ),
  role: createFilteredReducer(
    combineReducers({
      data: combineReducers({
        roles: rolesReducer,
      }),
    }),
    TargetPredicates.equal(Target.AdminPage.ROLE)
  ),
});
