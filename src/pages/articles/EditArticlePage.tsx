import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Segment, Header, Grid, Menu, Sticky, Ref } from 'semantic-ui-react';
import { EditArticleForm } from '../../domains/article';
import { addToast } from '../../store/actions';
import { CRUDToastBuilder } from '../../components/toast';
import { useScrollToTop } from '../../shared/hooks';
import { useParams } from 'react-router';
import { TOP_NAV_OFFSET } from '../../shared/variables';

export const EditArticlePage: React.FC = () => {
  const { id } = useParams();
  useScrollToTop();

  const contextRef = React.useRef<HTMLElement>(null);

  const dispatch = useDispatch();

  return (
    <Grid container stackable>
      <Ref innerRef={contextRef}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sticky context={contextRef} offset={TOP_NAV_OFFSET}>
              <Menu vertical fluid>
                <Menu.Item
                  as={Link}
                  link
                  content="Tới bài viết"
                  to={`/articles/${id}/view`}
                  icon="arrow left"
                />
              </Menu>
            </Sticky>
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
      </Ref>
    </Grid>
  );
};
