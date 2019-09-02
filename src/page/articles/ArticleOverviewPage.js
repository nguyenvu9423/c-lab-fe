import * as React from 'react';
import { connect } from 'react-redux';
import { fetchArticleList } from '../../action/article';
import { Card, Grid, Input, Menu, Pagination } from 'semantic-ui-react';
import { OverviewArticleCard } from './components/OverviewArticleCard';
import * as qs from 'qs';

class BaseArticleOverviewPage extends React.Component {
  constructor() {
    super();
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    const { fetchArticleList, location } = this.props;
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    fetchArticleList({
      page: params.page - 1
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const { fetchArticleList, location } = this.props;
      const params = qs.parse(location.search, { ignoreQueryPrefix: true });
      fetchArticleList({
        page: params.page - 1
      });
    }
  }

  handlePageChange(e, data) {
    const { activePage } = data;
    const { history } = this.props;
    history.push({ search: `?page=${activePage}` });
  }

  render() {
    const {
      articleOverview: { articleList, totalPages, number }
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
          <div style={{ marginTop: 25, textAlign: 'center' }}>
            <Pagination
              totalPages={totalPages}
              activePage={number + 1}
              onPageChange={this.handlePageChange}
            />
          </div>
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
