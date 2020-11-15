import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import { EditArticleForm } from '../../domains/article/EditArticleForm';

export function EditArticlePage(props) {
  const {
    history,
    match: {
      params: { id }
    }
  } = props;

  const handleSuccess = () => {
    history.push(`/articles/${id}`);
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <Container>
      <Segment clearing>
        <Header as="h2">Write article</Header>
        <EditArticleForm
          articleId={id}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </Segment>
    </Container>
  );
}
