import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../../store/actions';
import { Target } from '../../../store/reducers/target';
import { ArticleSelectors } from '../../../store/selectors/ArticleSelectors';
import {
  Segment,
  Table,
  Button,
  Modal,
  Confirm,
  Grid,
} from 'semantic-ui-react';
import { Pagination } from '../../../components';
import { TableContainer } from './shared';
import { LoadingState } from '../../../store/common';
import { AddArticleForm } from '../../../domains/article';
import { ArticleService } from '../../../service/ArticleService';
import { EditArticleForm } from '../../../domains/article';
import { BufferedInput } from '../../../components/input';
import { TagSelect } from '../../../domains/tag';
import { FilterUtils } from '../../../utility/filter/utils';
import { ComparisonOperator } from '../../../utility/filter';
import { UserSelect } from '../../../domains/user/UserSelect';
import { ArticleTitleSelect } from '../../../domains/article/input/ArticleTitleSelect';
import { State } from '../../../store';
import { Pageable } from '../../../utility';

const pageSize = 10;

const initialPageable: Pageable = {
  page: 0,
  size: pageSize,
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

  const [filters, setFilters] = React.useState({
    id: undefined,
    title: undefined,
    author: undefined,
    tags: undefined,
  });

  const currentPageable: Pageable =
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
          target: Target.ADMIN_PAGE.ARTICLE,
        })
      );
    },
    [currentPageable, currentQuery]
  );

  const handleFilterChange = React.useCallback((filters) => {
    setFilters(filters);
    let query = '';
    if (filters.id) {
      query = FilterUtils.joinAnd(
        query,
        `id${ComparisonOperator.EQUAL}${filters.id}`
      );
    }
    if (filters.title) {
      query = FilterUtils.joinAnd(
        query,
        `title${ComparisonOperator.EQUAL}'*${filters.title}*'`
      );
    }
    if (filters.author) {
      query = FilterUtils.joinAnd(
        query,
        `author.username${ComparisonOperator.EQUAL}${filters.author.username}`
      );
    }
    if (filters.tags && filters.tags.length) {
      query = FilterUtils.joinAnd(
        query,
        `tags=include=(${filters.tags.map((tag) => tag.name)})`
      );
    }

    load({ query });
  }, []);

  React.useEffect(() => {
    load({ pageable: { page: 0, size: pageSize } });
  }, []);

  const articles = useSelector(
    data.articles.loadingState === LoadingState.LOADED
      ? ArticleSelectors.byIds(data.articles.result)
      : () => undefined
  );

  return (
    <Segment clearing>
      <Segment vertical clearing>
        <Grid columns={4} doubling>
          <Grid.Row>
            <Grid.Column>
              <Button
                icon="add"
                label="Add article"
                primary
                onClick={() => {
                  setOpenAddForm(true);
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              <BufferedInput
                type="text"
                name="id"
                placeholder="ID"
                fluid
                onChange={(value) =>
                  handleFilterChange({ ...filters, id: value })
                }
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <ArticleTitleSelect
                onChange={(value) =>
                  handleFilterChange({ ...filters, title: value })
                }
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <UserSelect
                placeholder="Author"
                onChange={(value) =>
                  handleFilterChange({ ...filters, author: value })
                }
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <TagSelect
                onChange={(value) =>
                  handleFilterChange({ ...filters, tags: value })
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment vertical>
        <TableContainer
          loading={LoadingState.isInProgress(data.articles.loadingState)}
        >
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Subtitle</Table.HeaderCell>
                <Table.HeaderCell>Overview</Table.HeaderCell>
                <Table.HeaderCell collapsing />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {articles?.map(
                (article) =>
                  article && (
                    <Table.Row key={article.id}>
                      <Table.Cell>{article.id}</Table.Cell>
                      <Table.Cell>{article.title}</Table.Cell>
                      <Table.Cell>{article.subtitle}</Table.Cell>
                      <Table.Cell>{article.overview}</Table.Cell>
                      <Table.Cell collapsing>
                        <Button
                          icon="edit"
                          size="tiny"
                          onClick={() => setEditedArticleId(article.id)}
                        />
                        <Button
                          icon="delete"
                          negative
                          size="tiny"
                          onClick={() => setDeletedArticleId(article.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  )
              )}
            </Table.Body>
          </Table>
        </TableContainer>
      </Segment>
      <Segment vertical>
        <Pagination
          floated="right"
          activePage={currentPageable.page + 1}
          totalPages={
            data.articles.loadingState === LoadingState.LOADED
              ? data.articles.totalPages
              : currentPageable.page + 1
          }
          onPageChange={(event, { activePage }) =>
            load({ pageable: { page: activePage - 1 } })
          }
        />
      </Segment>

      <Modal open={openAddForm} onClose={() => setOpenAddForm(false)}>
        <Modal.Header>Add article</Modal.Header>
        <Modal.Content scrolling>
          <AddArticleForm
            onCancel={() => setOpenAddForm(false)}
            onSuccess={() => {
              setOpenAddForm(false);
              load();
            }}
          />
        </Modal.Content>
      </Modal>
      <Modal
        open={!!editedArticleId}
        onClose={() => setEditedArticleId(undefined)}
      >
        <Modal.Header>Edit article</Modal.Header>
        <Modal.Content scrolling>
          {editedArticleId && (
            <EditArticleForm
              articleId={editedArticleId}
              onCancel={() => setEditedArticleId(undefined)}
              onSuccess={() => {
                setEditedArticleId(undefined);
                load();
              }}
            />
          )}
        </Modal.Content>
      </Modal>
      <Confirm
        open={!!deletedArticleId}
        header="Delete article"
        onCancel={() => setDeletedArticleId(undefined)}
        onConfirm={() => {
          ArticleService.deleteArticle(deletedArticleId).then(() => {
            setDeletedArticleId(undefined);
            load();
          });
        }}
      />
    </Segment>
  );
};
