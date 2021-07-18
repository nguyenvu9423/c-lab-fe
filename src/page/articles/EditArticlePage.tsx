import * as React from 'react';
import { Segment, Header, Grid, Menu } from 'semantic-ui-react';
import { EditArticleForm } from '../../domains/article';
import { useHistory, match } from 'react-router';
import { Link } from 'react-router-dom';

export const EditArticlePage: React.FC<{ match: match<{ id: string }> }> = (
  props
) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const history = useHistory();

  const handleSuccess = () => {
    history.push(`/articles/${id}`);
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <Grid container>
      <Grid.Row>
        <Grid.Column width={4}>
          <Menu vertical fluid>
            <Menu.Item
              as={Link}
              link
              name="Article page"
              to={`/articles/${id}`}
              icon="arrow left"
            />
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment clearing>
            <Header as="h2">Write article</Header>
            <EditArticleForm
              articleId={Number(id)}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
