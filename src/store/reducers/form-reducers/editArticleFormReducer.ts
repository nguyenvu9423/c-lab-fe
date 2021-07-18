import { ArticleState } from './../data-holders/articleReducer';
import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { articleReducer } from '../data-holders/articleReducer';
import { createTargetChecker, Target } from '../target';

export interface EditArticleFormState {
  data: {
    article: ArticleState;
  };
}

export const editArticleFormReducer = filterActions(
  combineReducers<EditArticleFormState>({
    data: combineReducers({
      article: articleReducer,
    }),
  }),
  createTargetChecker(Target.EDIT_ARTICLE_FORM)
);
