import * as React from 'react';
import { fetchArticles } from '../../store/actions/article';
import { Card, Grid, GridColumn, Pagination } from 'semantic-ui-react';
import { OverviewArticleCard } from './components/OverviewArticleCard';
import { useSelector, useDispatch } from 'react-redux';
import { Target } from '../../store/reducers/target';
import { LoadingState } from '../../store/common';
import { LoadingIndicator, TagFilterCard } from '../../components';
import { ArticleSelectors } from '../../store/selectors';
import { State } from '../../store';
import { Pageable } from '../../utility';
import { DataHolderState } from '../../store/reducers/data-holders/shared';
import { resetState } from '../../store/actions';
import { useScrollToTop } from '../../common/hooks';

const initialPageable: Pageable = {
  page: 0,
  size: 10,
};

export const ArticlesPage: React.FC = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.articlesPage);

  const currentPageable = DataHolderState.isLoadRequested(data.articles)
    ? data.articles.pageable
    : initialPageable;

  const currentQuery = DataHolderState.isLoadRequested(data.articles)
    ? data.articles.query
    : undefined;

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
    [dispatch, currentPageable, currentQuery]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.ARTICLES_PAGE }));
    };
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
    <Grid container stackable doubling>
      <Grid.Row>
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
      </Grid.Row>
    </Grid>
  );
};
