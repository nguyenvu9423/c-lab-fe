import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Table } from 'semantic-ui-react';

import { fetchArticles, resetState } from '../../../../store/actions';
import { Target } from '../../../../store/reducers/target';
import { ArticleSelectors } from '../../../../store/selectors/ArticleSelectors';
import { Pagination } from '../../../../components';
import { AddButton, EditRowButton, DeleteRowButton } from '../shared';
import { LoadingState } from '../../../../store/common';
import { State } from '../../../../store';
import { Pageable } from '../../../../utility';
import {
  DataHolder,
  DataHolderState,
} from '../../../../store/reducers/data-holders/shared';
import { ArticleFilter } from './ArticleFilter';
import {
  AddArticleModal,
  EditArticleModal,
  DeleteArticleConfirm,
} from '../../../../domains/article';
import { ErrorTableBody, LoadingTableBody } from '../../../../components/table';
import { ArticlePageLink } from '../../..';

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

  const currentPageable = DataHolder.usePageable(
    data.articles,
    initialPageable
  );
  const currentQuery = DataHolder.useQuery(data.articles);

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
        <AddButton label="Thêm" onClick={() => setOpenAddForm(true)} />
      </Segment>
      <Segment vertical>
        <ArticleFilter onChange={(query) => load({ query })} />
      </Segment>
      <Segment className="table-container" vertical style={{ minHeight: 600 }}>
        <Table basic="very" fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>ID</Table.HeaderCell>
              <Table.HeaderCell width={4}>Tiêu đề</Table.HeaderCell>
              <Table.HeaderCell width={4}>Phụ đề</Table.HeaderCell>
              <Table.HeaderCell width={4}>Tổng quan</Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>
          {DataHolderState.isLoading(data.articles) && <LoadingTableBody />}

          {DataHolderState.isLoaded(data.articles) && articles && (
            <Table.Body>
              {articles.map(
                (article) =>
                  article && (
                    <Table.Row key={article.id}>
                      <Table.Cell>
                        <ArticlePageLink article={article}>
                          {article.id}
                        </ArticlePageLink>
                      </Table.Cell>
                      <Table.Cell>
                        <ArticlePageLink article={article}>
                          {article.title}
                        </ArticlePageLink>
                      </Table.Cell>
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
          )}

          {DataHolderState.isError(data.articles) && (
            <ErrorTableBody message={data.articles.error.message} />
          )}
        </Table>
      </Segment>
      <Segment vertical textAlign="right">
        <Pagination
          activePage={currentPageable.page + 1}
          totalPages={totalPages}
          onPageChange={(event, { activePage }) => {
            load({
              pageable: { page: Number(activePage) - 1, size: PAGE_SIZE },
            });
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
