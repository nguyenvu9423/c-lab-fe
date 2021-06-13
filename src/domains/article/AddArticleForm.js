import * as React from 'react';
import { ArticleForm } from './ArticleForm';
import { ArticleService } from '../../service/ArticleService';

export function AddArticleForm(props) {
  const { onCancel, onSuccess } = props;
  const handleSubmit = React.useCallback(
    (values) => {
      ArticleService.createArticle(values).then(({ data }) =>
        onSuccess?.(data)
      );
    },
    [onSuccess]
  );
  return <ArticleForm onSubmit={handleSubmit} onCancel={onCancel} />;
}
