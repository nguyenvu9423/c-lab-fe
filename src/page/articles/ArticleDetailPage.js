import * as React from 'react';
import { connect } from 'react-redux';
import { fetchArticle } from '../../store/actions/article';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Message,
  Ref,
  Segment,
  Sticky
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ContentTable } from './internal/ContentTable';
import { createRef } from 'react';

class BaseArticleDetailPage extends React.Component {
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
    const { article, articleState, match } = this.props;
    if (articleState.error) {
      return (
        <Container>
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{articleState.error.message}</p>
          </Message>
        </Container>
      );
    }
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
            <ContentTable structure={article && article.contentTable} />
          </Sticky>
        </Grid.Column>
      </Grid>
    );
  }
}

const ArticleDetailPage = connect(
  (state, ownProps) => {
    const articleState = state.article;
    const article = state.entities.article[articleState.articleId];
    return { article, articleState };
  },
  { fetchArticleById: fetchArticle.request }
)(BaseArticleDetailPage);

export { ArticleDetailPage };
