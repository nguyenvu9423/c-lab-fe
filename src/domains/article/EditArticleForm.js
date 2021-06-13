import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ArticleForm } from './ArticleForm';
import { ArticleService } from '../../service/ArticleService';
import { fetchArticle } from '../../store/actions';
import { Target } from '../../store/reducers/target';
import { LoadingIndicator } from '../../components';
import { LoadingState } from '../../store/common';
import { ArticleSelectors } from '../../store/selectors';

export function EditArticleForm(props) {
  const { articleId, onCancel, onSuccess } = props;
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.editArticleForm);
  const article = useSelector(ArticleSelectors.byId(articleId));

  React.useEffect(() => {
    dispatch(
      fetchArticle.request(
        { id: articleId },
        { target: Target.EDIT_ARTICLE_FORM }
      )
    );
  }, []);

  const handleSubmit = React.useCallback(
    (values) => {
      ArticleService.updateArticle(articleId, values).then(() => {
        onSuccess?.();
      });
    },
    [articleId, onSuccess]
  );

  if (LoadingState.isInProgress(data.article.loadingState)) {
    return <LoadingIndicator />;
  }

  return (
    <ArticleForm
      initialArticle={article}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
}
