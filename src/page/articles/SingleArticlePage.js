import * as React from 'react';
import { connect } from 'react-redux';
import { fetchArticle } from '../../action/article';
import {
  Button,
  Grid,
  Header,
  Icon,
  Ref,
  Segment,
  Sticky
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ContentTable } from './internal/ContentTable';
import { createRef } from 'react';

class BaseSingleArticlePage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { match, fetchArticleById } = this.props;
    const id = match.params['id'];
    fetchArticleById(id);
  }
  contextRef = createRef();

  render() {
    const { article, match } = this.props;
    return (
      <Grid container>
        <Grid.Column width={12}>
          <Ref innerRef={this.contextRef}>
            <Segment>
              <Grid colums={2} divided={'vertically'}>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Header as={'h1'}>{article && article.title}</Header>
                  </Grid.Column>
                  <Grid.Column
                    width={8}
                    verticalAlign={'middle'}
                    textAlign={'right'}
                  >
                    <Button.Group>
                      <Button
                        icon
                        labelPosition={'left'}
                        as={Link}
                        to={`${match.url}/edit`}
                      >
                        Edit
                        <Icon name={'edit'} />
                      </Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <div
                      className={'article-container'}
                      dangerouslySetInnerHTML={{
                        __html: article && article.content
                      }}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Ref>
        </Grid.Column>
        <Grid.Column width={4}>
          <Sticky context={this.contextRef} offset={76}>
            <ContentTable cntext structure={article && article.contentTable} />
          </Sticky>
        </Grid.Column>
      </Grid>
    );
  }
}

const SingleArticlePage = connect(
  (state, ownProps) => {
    const {
      match: {
        params: { id }
      }
    } = ownProps;
    const article = state.entities.article[id];
    return { article };
  },
  { fetchArticleById: fetchArticle.request }
)(BaseSingleArticlePage);

export { SingleArticlePage };
