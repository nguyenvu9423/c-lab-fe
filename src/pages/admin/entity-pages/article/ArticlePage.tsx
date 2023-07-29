import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Table } from 'semantic-ui-react';

import { fetchArticles, resetState } from '@/store/actions';
import { Target } from '@/store/reducers/target';
import { ArticleSelectors } from '@/store/selectors/ArticleSelectors';
import { Pagination } from '@/components';
import { LoadingState } from '@/store/common';
import { State } from '@/store';
import {
  DataHolder,
  DataHolderState,
} from '@/store/reducers/data-holders/shared';
import { ArticleFilter } from './ArticleFilter';
import {
  AddArticleModal,
  EditArticleModal,
  DeleteArticleConfirm,
} from '@/domain-ui/article';
import { ErrorTableBody, LoadingTableBody } from '@/components/table';

import { ArticlePageLink } from '../../../articles/ArticlePageLink';
import { PageUtils } from '../../../shared';
import { AddButton, EditRowButton, DeleteRowButton } from '../shared';

const PAGE_SIZE = 10;

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

  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState<string | undefined>();

  const loadTotalPages = DataHolder.useTotalPages(data.articles);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);
  PageUtils.useCorrectPageListener(page, totalPages, setPage);

  const load = React.useCallback(() => {
    dispatch(
      fetchArticles.request({
        pageable: { page, size: PAGE_SIZE },
        query,
        target: Target.AdminPage.ARTICLE,
      }),
    );
  }, [dispatch, page, query]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.ARTICLE }));
    };
  }, [load, dispatch]);

  const articles = useSelector(
    data.articles.loadingState === LoadingState.LOADED
      ? ArticleSelectors.byIds(data.articles.result)
      : () => undefined,
  );

  return (
    <Segment clearing>
      <Segment vertical>
        <AddButton label="Thêm" onClick={() => setOpenAddForm(true)} />
      </Segment>
      <Segment vertical>
        <ArticleFilter onChange={setQuery} />
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
                  ),
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
          activePage={page}
          totalPages={totalPages || 0}
          onPageChange={(event, { activePage }) => setPage(Number(activePage))}
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
