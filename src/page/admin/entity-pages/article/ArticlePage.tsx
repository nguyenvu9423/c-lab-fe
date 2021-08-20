import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Table } from 'semantic-ui-react';

import { fetchArticles, resetState } from '../../../../store/actions';
import { Target } from '../../../../store/reducers/target';
import { ArticleSelectors } from '../../../../store/selectors/ArticleSelectors';
import { LoadingIndicator, Pagination } from '../../../../components';
import { AddButton, EditRowButton, DeleteRowButton } from '../shared';
import { LoadingState } from '../../../../store/common';
import { State } from '../../../../store';
import { Pageable } from '../../../../utility';
import { DataHolderState } from '../../../../store/reducers/data-holders/shared';
import { ArticleFilter } from './ArticleFilter';
import {
  AddArticleModal,
  EditArticleModal,
  DeleteArticleConfirm,
} from '../../../../domains/article';

const PAGE_SIZE = 10;

const initialPageable: Pageable = {
  page: 0,
  size: PAGE_SIZE,
};

export const ArticlePage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.adminPage.article);
  const [openAddForm, setOpenAddForm] = React.useState(false);

  const [editedArticleId, setEditedArticleId] = React.useState<
    number | undefined
  >(undefined);

  const [deletedArticleId, setDeletedArticleId] = React.useState<
    number | undefined
  >(undefined);

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
          target: Target.AdminPage.ARTICLE,
        })
      );
    },
    [dispatch, currentPageable, currentQuery]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.ARTICLE }));
    };
  }, []);

  const [totalPages, setTotalPages] = React.useState<number>(0);

  React.useEffect(() => {
    if (DataHolderState.isLoaded(data.articles)) {
      setTotalPages(data.articles.totalPages);
    }
  }, [data.articles]);

  React.useEffect(() => {
    if (totalPages && totalPages > 0 && currentPageable.page > totalPages - 1) {
      load({ pageable: { page: totalPages - 1, size: PAGE_SIZE } });
    }
  }, [totalPages, currentPageable.page]);

  const articles = useSelector(
    data.articles.loadingState === LoadingState.LOADED
      ? ArticleSelectors.byIds(data.articles.result)
      : () => undefined
  );

  return (
    <Segment clearing>
      <Segment vertical>
        <AddButton label="Add article" onClick={() => setOpenAddForm(true)} />
      </Segment>
      <Segment vertical>
        <ArticleFilter onChange={(query) => load({ query })} />
      </Segment>
      <Segment vertical style={{ height: 600, overflowY: 'auto' }}>
        {DataHolderState.isLoading(data.articles) && <LoadingIndicator />}
        <Table basic="very" fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>ID</Table.HeaderCell>
              <Table.HeaderCell width={4}>Title</Table.HeaderCell>
              <Table.HeaderCell width={4}>Subtitle</Table.HeaderCell>
              <Table.HeaderCell width={4}>Overview</Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {DataHolderState.isLoaded(data.articles) &&
              articles &&
              articles.map(
                (article) =>
                  article && (
                    <Table.Row key={article.id}>
                      <Table.Cell>{article.id}</Table.Cell>
                      <Table.Cell>{article.title}</Table.Cell>
                      <Table.Cell>{article.subtitle}</Table.Cell>
                      <Table.Cell>{article.overview}</Table.Cell>
                      <Table.Cell textAlign="right">
                        <EditRowButton
                          onClick={() => setEditedArticleId(article.id)}
                        />
                        <DeleteRowButton
                          onClick={() => setDeletedArticleId(article.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  )
              )}
          </Table.Body>
        </Table>
      </Segment>
      <Segment vertical textAlign="right">
        <Pagination
          activePage={currentPageable.page + 1}
          totalPages={totalPages}
          onPageChange={(event, { activePage }) => {
            load({ pageable: { page: activePage - 1, size: PAGE_SIZE } });
          }}
        />
      </Segment>

      {openAddForm && (
        <AddArticleModal
          onCancel={() => setOpenAddForm(false)}
          onSuccess={() => {
            setOpenAddForm(false);
            load();
          }}
        />
      )}

      {editedArticleId && (
        <EditArticleModal
          articleId={editedArticleId}
          onCancel={() => setEditedArticleId(undefined)}
          onSuccess={() => {
            setEditedArticleId(undefined);
            load();
          }}
        />
      )}

      {deletedArticleId && (
        <DeleteArticleConfirm
          articleId={deletedArticleId}
          onCancel={() => setDeletedArticleId(undefined)}
          onSuccess={() => {
            setDeletedArticleId(undefined);
            load();
          }}
        />
      )}
    </Segment>
  );
};
