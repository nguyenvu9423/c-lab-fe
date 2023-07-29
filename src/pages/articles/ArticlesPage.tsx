import * as React from 'react';
import { Card, Grid, PaginationProps } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import QueryString from 'qs';

import { fetchArticles } from '../../store/actions/article';
import { OverviewArticleCard } from './components/OverviewArticleCard';
import { useSelector, useDispatch } from 'react-redux';
import { Target } from '../../store/reducers/target';
import { LoadingState } from '../../store/common';
import { LoadingIndicator, Pagination } from '@/components';
import { ArticleSelectors } from '@/store/selectors';
import { State } from '../../store';
import { DataHolder } from '../../store/reducers/data-holders/shared';
import { resetState } from '../../store/actions';
import { useScrollToTop } from '../../shared/hooks';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { PageUtils } from '../shared';
import { OnlyNameTag } from '@/domains/tag';
import { RsqlUtils } from '../../utils';
import { TagFilterCard } from '@/domain-ui/tag';

const ARTICLES_PAGE_SIZE = 10;

export const ArticlesPage: React.FC = () => {
  useScrollToTop();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') ?? undefined;

  const { data } = useSelector((state: State) => state.articlesPage);
  const loadTotalPages = DataHolder.useTotalPages(data.articles);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);
  PageUtils.useCorrectPage(page, totalPages);

  const load = React.useCallback(() => {
    dispatch(
      fetchArticles.request({
        pageable: { page, size: ARTICLES_PAGE_SIZE },
        query,
        target: Target.ARTICLES_PAGE,
      }),
    );
  }, [dispatch, page, query]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.ARTICLES_PAGE }));
    };
  }, [load, dispatch]);

  const handlePageChange = React.useCallback(
    (event, { activePage }: PaginationProps) => {
      navigate({ search: QueryString.stringify({ page: activePage, query }) });
    },
    [query, navigate],
  );

  const handleFilterChange = React.useCallback(
    (tags) => {
      const newQuery =
        tags.length > 0
          ? RsqlUtils.emit(
              RsqlUtils.Builder.comparison(
                'tags',
                '=include=',
                tags.map((tag) => tag.name),
              ),
            )
          : undefined;
      navigate({ search: QueryString.stringify({ page, query: newQuery }) });
    },
    [page, navigate],
  );

  const initialTags: OnlyNameTag[] = React.useMemo(
    () => (query ? PageUtils.getTagsFromQuery(query) : []),
    [],
  );

  const articles = useSelector(
    data.articles.loadingState === LoadingState.LOADED
      ? ArticleSelectors.byIds(data.articles.result)
      : () => undefined,
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
                          ),
                      )
                    : null}
                </Card.Group>
                <div style={{ marginTop: 25, textAlign: 'center' }}>
                  <Pagination
                    totalPages={totalPages || 0}
                    activePage={page}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <TagFilterCard
              initialTags={initialTags}
              onSubmit={handleFilterChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
