import * as React from 'react';
import { fetchArticles } from '../../store/actions/article';
import { Card, Grid, Pagination } from 'semantic-ui-react';
import { OverviewArticleCard } from './components/OverviewArticleCard';
import { useSelector, useDispatch } from 'react-redux';
import { Target } from '../../store/reducers/target';
import { LoadingState } from '../../store/common';
import { LoadingIndicator, TagFilterCard } from '../../components';
import { ArticleSelectors } from '../../store/selectors';

export function ArticlesPage() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state[Target.ARTICLES_PAGE]);

  const load = React.useCallback(
    ({ pageable, query } = {}) => {
      dispatch(
        fetchArticles.request(
          {
            pageable: pageable ?? data.articles.pageable,
            query: query ?? data.articles.query
          },
          { target: Target.ARTICLES_PAGE }
        )
      );
    },
    [data]
  );

  React.useEffect(() => {
    load();
  }, []);

  const handleFilterChange = React.useCallback(
    tags => {
      let query = '';
      if (tags?.length) {
        query = `tags=include=(${tags.map(tag => tag.name)})`;
      }
      load({ query });
    },
    [load]
  );

  const articles = useSelector(ArticleSelectors.byIds(data.articles.ids));
  const { totalPages, pageable } = data.articles;

  return (
    <Grid container>
      <Grid.Column width={12}>
        {LoadingState.isInProgress(data.articles.loadingState) ? (
          <LoadingIndicator />
        ) : (
          <>
            <Card.Group>
              {articles
                ? articles.map(article => (
                    <OverviewArticleCard key={article.id} article={article} />
                  ))
                : null}
            </Card.Group>
            <div style={{ marginTop: 25, textAlign: 'center' }}>
              <Pagination
                totalPages={totalPages}
                activePage={pageable.page + 1}
              />
            </div>
          </>
        )}
      </Grid.Column>
      <Grid.Column width={4}>
        <TagFilterCard onSubmit={handleFilterChange} />
      </Grid.Column>
    </Grid>
  );
}
