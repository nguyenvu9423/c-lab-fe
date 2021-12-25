import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Container, Segment, Header } from 'semantic-ui-react';
import { useScrollToTop } from '../../common/hooks';
import { AddArticleForm } from '../../domains/article';
import { AuthorizationSelectors } from '../../store/selectors';
import { PageErrorMessage } from '../shared';

export const AddArticlePage: React.FC = () => {
  useScrollToTop();

  const navigate = useNavigate();

  const handleSuccess = (article) => {
    navigate(`/articles/${article.id}/view/${article.slug}`);
  };
  const handleCancel = () => navigate(-1);

  const canCreateArticle = useSelector(
    AuthorizationSelectors.canCreateArticle()
  );

  if (!canCreateArticle) {
    return <PageErrorMessage message="Bạn không có quyền truy cập trang này" />;
  }

  return (
    <Container>
      <Segment>
        <Header as="h2">Tạo bài viết</Header>
        <AddArticleForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </Segment>
    </Container>
  );
};
