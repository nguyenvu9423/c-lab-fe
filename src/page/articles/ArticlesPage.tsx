import * as React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import { fetchArticles } from '../../store/actions/article';
import { OverviewArticleCard } from './components/OverviewArticleCard';
import { useSelector, useDispatch } from 'react-redux';
import { Target } from '../../store/reducers/target';
import { LoadingState } from '../../store/common';
import { LoadingIndicator, Pagination, TagFilterCard } from '../../components';
import { ArticleSelectors } from '../../store/selectors';
import { State } from '../../store';
import { Pageable } from '../../utility';
import { DataHolder } from '../../store/reducers/data-holders/shared';
import { resetState } from '../../store/actions';
import { useScrollToTop } from '../../common/hooks';

const ARTICLES_PAGE_SIZE = 10;

const initialPageable: Pageable = {
  page: 0,
  size: ARTICLES_PAGE_SIZE,
};

export const ArticlesPage: React.FC = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.articlesPage);

  const currentPageable = DataHolder.usePageable(
    data.articles,
    initialPageable
  );
  const currentQuery = DataHolder.useQuery(data.articles);
  const totalPage = DataHolder.useTotalPages(data.articles);

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

  const handlePageChange = React.useCallback(
    (event, { activePage }) => {
      load({ pageable: { page: activePage - 1, size: ARTICLES_PAGE_SIZE } });
    },
    [load]
  );

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
    <>
      <Helmet>
        <title>Bài viết</title>
      </Helmet>
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
                    totalPages={totalPage}
                    activePage={currentPageable.page + 1}
                    onPageChange={handlePageChange}
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
    </>
  );
};
