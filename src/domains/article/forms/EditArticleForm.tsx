import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ArticleForm } from './ArticleForm';
import { ArticleService } from '../../../service/ArticleService';
import { fetchArticle, resetState } from '../../../store/actions';
import { Target } from '../../../store/reducers/target';
import { LoadingIndicator } from '../../../components';
import { LoadingState } from '../../../store/common';
import {
  ArticleSelectors,
  AuthorizationSelectors,
} from '../../../store/selectors';
import { State } from '../../../store';
import { FieldError, ValidationException } from '../../../exception';
import { TagSelectors } from '../../../store/selectors/TagSelectors';

export namespace EditArticleForm {
  export interface Props {
    articleId: number;
    onSuccess?(any): void;
    onCancel?(): void;
  }
}

export const EditArticleForm: React.FC<EditArticleForm.Props> = (props) => {
  const { articleId, onCancel, onSuccess } = props;
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.editArticleForm);

  const article = useSelector(
    data.article.loadingState === LoadingState.LOADED
      ? ArticleSelectors.byId(articleId)
      : () => undefined
  );

  const tags = useSelector(
    article ? TagSelectors.selectTagsByIds(article.tags) : () => undefined
  );

  const initialValues = React.useMemo(() => {
    return article && tags
      ? {
          ...article,
          content: JSON.parse(article.content),
          tags,
        }
      : undefined;
  }, [article, tags]);

  const [errors, setErrors] = React.useState<FieldError[] | undefined>();

  React.useEffect(() => {
    dispatch(
      fetchArticle.request({ id: articleId, target: Target.EDIT_ARTICLE_FORM })
    );
    return () => {
      dispatch(resetState({ target: Target.EDIT_ARTICLE_FORM }));
    };
  }, [dispatch, articleId]);

  const handleSubmit = React.useCallback(
    (values) => {
      let { thumbnail, content, ...dto } = values;
      dto.content = JSON.stringify(content);

      const formData = new FormData();

      if (typeof thumbnail === 'string') {
        dto['thumbnail'] = thumbnail;
      } else if (thumbnail instanceof File) {
        formData.append('thumbnail', thumbnail);
      }

      formData.append(
        'article',
        new Blob([JSON.stringify(dto)], { type: 'application/json' })
      );

      return ArticleService.updateArticle(articleId, formData)
        .then((response) => {
          onSuccess?.(response.data);
        })
        .catch((error) => {
          if (ValidationException.isInstance(error)) {
            setErrors(error.errors);
          }
        });
    },
    [articleId, onSuccess]
  );

  const canEdit = useSelector(
    article ? AuthorizationSelectors.canUpdateArticle(article) : () => undefined
  );

  if (canEdit === false) {
    return <p>Bạn không có quyền chỉnh sửa bài viết này</p>;
  }

  if (LoadingState.isInProgress(data.article.loadingState)) {
    return <LoadingIndicator />;
  }

  return article ? (
    <ArticleForm
      initialValues={initialValues}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      status={{ errors }}
    />
  ) : null;
};
