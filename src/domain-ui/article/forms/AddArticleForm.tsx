import * as React from 'react';
import { ArticleForm } from './ArticleForm';
import { ArticleService } from '@/services/ArticleService';
import { useScrollToTop } from '@/shared/hooks';

export const AddArticleForm: React.FC<{
  onCancel?: () => void;
  onSuccess?: (data: any) => void;
}> = (props) => {
  const { onCancel, onSuccess } = props;
  useScrollToTop();

  const handleSubmit = React.useCallback(
    (values) => {
      const { thumbnail, content, ...article } = values;
      article.content = JSON.stringify(content);

      const formData = new FormData();

      formData.append(
        'article',
        new Blob([JSON.stringify(article)], { type: 'application/json' })
      );
      if (thumbnail && thumbnail instanceof File) {
        formData.append('thumbnail', thumbnail);
      }

      return ArticleService.createArticle(formData).then(({ data }) => {
        onSuccess?.(data);
      });
    },
    [onSuccess]
  );
  return <ArticleForm onSubmit={handleSubmit} onCancel={onCancel} />;
};
