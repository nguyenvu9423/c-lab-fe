import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Segment, Header, Grid, Menu } from 'semantic-ui-react';
import { EditArticleForm } from '../../domains/article';
import { addToast } from '../../store/actions';
import { CRUDToastBuilder } from '../../components/toast';

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
              content="Tới bài viết"
              to={`/articles/${id}/view`}
              icon="arrow left"
            />
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment clearing>
            <Header as="h2">Sửa bài viết</Header>
            <EditArticleForm
              articleId={Number(id)}
              onSuccess={() => {
                dispatch(
                  addToast(
                    new CRUDToastBuilder('bài viết', 'sửa')
                      .setStatus('success')
                      .build()
                  )
                );
              }}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
