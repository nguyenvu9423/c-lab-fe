import * as React from 'react';
import { connect } from 'react-redux';
import { fetchArticleList } from '../../action/article';
import { Grid, Card, Menu, Input } from 'semantic-ui-react';
import { OverviewArticleCard } from './components/OverviewArticleCard';

class BaseArticleOverviewPage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { fetchArticleList } = this.props;
    fetchArticleList();
  }

  render() {
    const {
      articleOverview: { articleList }
    } = this.props;
    return (
      <Grid container columns={2}>
        <Grid.Column width={12}>
          <Card.Group>
            {articleList
              ? articleList.map(articleId => (
                  <OverviewArticleCard key={articleId} articleId={articleId} />
                ))
              : null}
          </Card.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Menu vertical fluid>
            <Menu.Item>
              <Input placeholder="Search..." />
            </Menu.Item>
            <Menu.Item>
              Home
              <Menu.Menu>
                <Menu.Item name="search">Search</Menu.Item>
              </Menu.Menu>
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </Grid>
    );
  }
}

export const ArticleOverviewPage = connect(
  state => {
    return {
      articleOverview: state.articleOverview
    };
  },
  {
    fetchArticleList: fetchArticleList.request
  }
)(BaseArticleOverviewPage);
