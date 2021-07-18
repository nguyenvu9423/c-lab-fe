import * as React from 'react';
import { fetchArticles } from '../../store/actions/article';
import { Card, Grid, Pagination } from 'semantic-ui-react';
import { OverviewArticleCard } from './components/OverviewArticleCard';
import { useSelector, useDispatch } from 'react-redux';
import { Target } from '../../store/reducers/target';
import { LoadingState } from '../../store/common';
import { LoadingIndicator, TagFilterCard } from '../../components';
import { ArticleSelectors } from '../../store/selectors';
import { State } from '../../store';
import { Pageable } from '../../utility';

const initialPageable: Pageable = {
  page: 0,
  size: 10,
};

export const ArticlesPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.articlesPage);

  const currentPageable =
    data.articles.loadingState === LoadingState.LOAD_NEEDED
      ? initialPageable
      : data.articles.pageable;

  const currentQuery =
    data.articles.loadingState === LoadingState.LOAD_NEEDED
      ? undefined
      : data.articles.query;

  const load = React.useCallback(
    ({ pageable, query } = {}) => {
      dispatch(
        fetchArticles.request({
          pageable: pageable ?? currentPageable,
          query: query ?? currentQuery,
          target: Target.ARTICLES_PAGE,
        })
      );
    },
    [currentPageable, currentQuery]
  );

  React.useEffect(() => {
    load();
  }, []);

  const handleFilterChange = React.useCallback(
    (tags) => {
      let query = '';
      if (tags?.length) {
        query = `tags=include=(${tags.map((tag) => tag.name)})`;
      }
      load({ query });
    },
    [load]
  );

  const articles = useSelector(
    data.articles.loadingState === LoadingState.LOADED
      ? ArticleSelectors.byIds(data.articles.result)
      : () => undefined
  );

  return (
    <Grid container>
      <Grid.Column width={12}>
        {LoadingState.isInProgress(data.articles.loadingState) ? (
          <LoadingIndicator />
        ) : (
          <>
            <Card.Group>
              {articles
                ? articles.map(
                    (article) =>
                      article && (
                        <OverviewArticleCard
                          key={article.id}
                          article={article}
                        />
                      )
                  )
                : null}
            </Card.Group>
            <div style={{ marginTop: 25, textAlign: 'center' }}>
              <Pagination
                totalPages={
                  data.articles.loadingState === LoadingState.LOADED
                    ? data.articles.totalPages
                    : currentPageable.page + 1
                }
                activePage={currentPageable.page + 1}
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
};
