import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Button, Table, Modal, Grid } from 'semantic-ui-react';
import { LoadingState } from '../../../store/common';
import { fetchTags } from '../../../store/actions';
import { Target } from '../../../store/reducers/target';
import { TagSelectors } from '../../../store/selectors/TagSelectors';
import { AddTagForm, DeleteTagConfirm } from '../../../domains/tag';
import { Pagination } from '../../../components';
import { TableContainer } from './shared';
import { BufferedInput } from '../../../components/input';
import { FilterUtils } from '../../../utility/filter/utils';
import { ComparisonOperator } from '../../../utility/filter';
import { TagNameSelect } from '../../../domains/tag/TagNameSelect';
import { State } from '../../../store';
import { Pageable } from '../../../utility';

const pageSize = 10;

const initialPageable: Pageable = {
  page: 0,
  size: pageSize,
};

export const TagPage: React.FC = () => {
  const { data } = useSelector((state: State) => state.adminPage.tag);
  const dispatch = useDispatch();
  const tags = useSelector(
    data.tags.loadingState === LoadingState.LOADED
      ? TagSelectors.selectByIds(data.tags.result)
      : () => undefined
  );
  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [deletedTagId, setDeletedTagId] = React.useState<number | undefined>(
    undefined
  );

  const [filters, setFilters] = React.useState({ id: '', name: '' });

  const currentPageable =
    data.tags.loadingState === LoadingState.LOAD_NEEDED
      ? initialPageable
      : data.tags.pageable;

  const currentQuery =
    data.tags.loadingState === LoadingState.LOAD_NEEDED
      ? undefined
      : data.tags.query;

  const load = React.useCallback(
    (params: { pageable?: Pageable; query?: string } = {}) =>
      dispatch(
        fetchTags.request({
          pageable: params.pageable ?? currentPageable,
          query: params.query ?? currentQuery,
          target: Target.ADMIN_PAGE.TAG,
        })
      ),
    [currentPageable, currentQuery]
  );

  const handleChange = React.useCallback((filters) => {
    setFilters(filters);
    let query = '';
    if (filters.id) {
      query = FilterUtils.joinAnd(
        query,
        `id${ComparisonOperator.EQUAL}${filters.id}`
      );
    }
    if (filters.name) {
      query = FilterUtils.joinAnd(
        query,
        `name${ComparisonOperator.EQUAL}*${filters.name}*`
      );
    }
    load({ query });
  }, []);

  React.useEffect(() => {
    if (data.tags.loadingState === LoadingState.LOAD_NEEDED) {
      load();
    }
  }, []);

  return (
    <>
      <Segment clearing>
        <Segment vertical clearing>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Button
                  icon="add"
                  label="Add tag"
                  primary
                  onClick={() => setOpenAddForm(true)}
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
                  onChange={(value) => {
                    handleChange({ ...filters, id: value });
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <TagNameSelect
                  onChange={(value) => {
                    handleChange({ ...filters, name: value });
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment vertical>
          {data.tags.loadingState === LoadingState.ERROR ? undefined : (
            <TableContainer
              loading={LoadingState.isInProgress(data.tags.loadingState)}
            >
              <Table basic="very">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={2}>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell collapsing></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {tags?.map(
                    (tag) =>
                      tag && (
                        <Table.Row key={tag.id}>
                          <Table.Cell>{tag.id}</Table.Cell>
                          <Table.Cell>{tag.name}</Table.Cell>
                          <Table.Cell collapsing>
                            <Button
                              icon="delete"
                              negative
                              size="tiny"
                              onClick={() => setDeletedTagId(tag.id)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                  )}
                </Table.Body>
              </Table>
            </TableContainer>
          )}
        </Segment>
        <Segment vertical>
          <Pagination
            activePage={currentPageable.page + 1}
            totalPages={
              data.tags.loadingState === LoadingState.LOADED
                ? data.tags.totalPages
                : currentPageable.page + 1
            }
            floated="right"
            onPageChange={(event, { activePage }) => {
              load({
                pageable: { page: activePage - 1, size: pageSize },
              });
            }}
          />
        </Segment>
      </Segment>
      <Modal open={openAddForm} onClose={() => setOpenAddForm(false)}>
        <Modal.Header>Add tag</Modal.Header>
        <Modal.Content>
          <AddTagForm
            onCancel={() => setOpenAddForm(false)}
            onSuccess={() => {
              setOpenAddForm(false);
              load();
            }}
          />
        </Modal.Content>
      </Modal>

      {deletedTagId && (
        <DeleteTagConfirm
          tagId={deletedTagId}
          onCancel={() => setDeletedTagId(undefined)}
          onSuccess={() => {
            setDeletedTagId(undefined);
            load();
          }}
        />
      )}
    </>
  );
};
