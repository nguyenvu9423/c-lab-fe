import * as React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import { AddArticleForm } from '../../domains/article';

export function AddArticlePage(props) {
  const { history } = props;
  const handleSuccess = (article) => {
    history.push(`/articles/${article.id}`);
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <Container>
      <Segment>
        <Header as="h2">Add article</Header>
        <AddArticleForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </Segment>
    </Container>
  );
}
