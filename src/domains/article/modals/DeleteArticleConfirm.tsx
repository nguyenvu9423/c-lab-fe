import * as React from 'react';
import { Confirm } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { ArticleService } from '../../../service/ArticleService';

export const DeleteArticleConfirm: React.FC<
  FormModal.Props & { articleId: number }
> = (props) => {
  return (
    <Confirm
      defaultOpen
      header={`Xóa bài viết #${props.articleId}`}
      cancelButton="Hủy"
      confirmButton="Đồng ý"
      content="Bạn có chắc chắn muốn xóa bài viết này"
      onCancel={props.onCancel}
      onConfirm={() => {
        ArticleService.deleteArticle(props.articleId).then(() => {
          props.onSuccess?.();
        });
      }}
    />
  );
};
