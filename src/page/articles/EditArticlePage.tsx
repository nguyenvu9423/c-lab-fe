import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Segment, Header, Grid, Menu } from 'semantic-ui-react';
import { EditArticleForm } from '../../domains/article';
import { addToast } from '../../store/actions';

export const EditArticlePage: React.FC<{ match: match<{ id: string }> }> = (
  props
) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const dispatch = useDispatch();

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
              onSuccess={() => {
                dispatch(
                  addToast({
                    header: 'Update judge config',
                    content: 'The judge config has been updated successfully',
                    duration: 2500,
                  })
                );
              }}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
