import { Target } from './../target';
import { combineReducers } from 'redux';
import { ArticleState } from './../data-holders/articleReducer';
import { articleReducer } from '../data-holders/articleReducer';
import { createFilteredReducer } from '../utils';
import { TargetPredicates } from '../target';

export interface EditArticleFormState {
  data: {
    article: ArticleState;
  };
}

export const editArticleFormReducer = createFilteredReducer(
  combineReducers<EditArticleFormState>({
    data: combineReducers({
      article: articleReducer,
    }),
  }),
  TargetPredicates.equal(Target.EDIT_ARTICLE_FORM),
);
