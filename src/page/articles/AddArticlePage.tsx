import * as React from 'react';
import { useNavigate } from 'react-router';
import { Container, Segment, Header } from 'semantic-ui-react';
import { useScrollToTop } from '../../common/hooks';
import { AddArticleForm } from '../../domains/article';

export const AddArticlePage: React.FC = () => {
  useScrollToTop();

  const navigate = useNavigate();

  const handleSuccess = (article) => {
    navigate(`/articles/${article.id}/view/${article.slug}`);
  };
  const handleCancel = () => navigate(-1);

  return (
    <Container>
      <Segment>
        <Header as="h2">Add article</Header>
        <AddArticleForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </Segment>
    </Container>
  );
};
