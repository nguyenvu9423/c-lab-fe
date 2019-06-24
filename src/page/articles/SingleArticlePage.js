import * as React from 'react';
import { connect } from 'react-redux';
import { fetchArticle } from '../../action/article';
import {
  Button,
  Grid,
  Header,
  Icon,
  Segment
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class BaseSingleArticlePage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { match, fetchArticleById } = this.props;
    const id = match.params['id'];
    fetchArticleById(id);
  }

  render() {
    const { article, match } = this.props;
    return (
      <Grid container>
        <Grid.Column width={'12'}>
          <Segment>
            <Grid colums={16} divided={'vertically'}>
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
                    dangerouslySetInnerHTML={{
                      __html: article && article.content
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
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
