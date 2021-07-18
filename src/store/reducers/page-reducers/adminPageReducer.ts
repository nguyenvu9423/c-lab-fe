import { ProblemsState } from './../data-holders/problemsReducer';
import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
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

import { createTargetChecker, Target } from '../target';

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
  [key: string]: any;
}

export const adminPageReducer = combineReducers<AdminPageState>({
  tag: filterActions<{ data: { tags: TagsState } }>(
    combineReducers({
      data: combineReducers({ tags: tagsReducer }),
    }),
    createTargetChecker(Target.ADMIN_PAGE.TAG)
  ),
  article: filterActions<{ data: { articles: ArticlesState } }>(
    combineReducers({
      data: combineReducers({ articles: articlesReducer }),
    }),
    createTargetChecker(Target.ADMIN_PAGE.ARTICLE)
  ),
  problem: filterActions<{
    data: {
      problems: ProblemsState;
    };
  }>(
    combineReducers({
      data: combineReducers({ problems: problemsReducer }),
    }),
    createTargetChecker(Target.ADMIN_PAGE.PROBLEM)
  ),
  user: filterActions<{ data: { users: UsersState } }>(
    combineReducers({
      data: combineReducers({
        users: usersReducer,
      }),
    }),
    createTargetChecker(Target.ADMIN_PAGE.USER)
  ),
  role: filterActions<{ data: { roles: RolesState } }>(
    combineReducers({
      data: combineReducers({
        roles: rolesReducer,
      }),
    }),
    createTargetChecker(Target.ADMIN_PAGE.ROLE)
  ),
});
