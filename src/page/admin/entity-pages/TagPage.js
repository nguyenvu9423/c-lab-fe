import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Button, Table, Modal, Grid } from 'semantic-ui-react';
import { LoadingState } from '../../../store/common';
import { fetchTags } from '../../../store/actions';
import { Target } from '../../../store/reducers/target';
import { TagSelectors } from '../../../store/selectors/TagSelectors';
import {
  AddTagForm,
  EditTagForm,
  DeleteTagConfirm,
} from '../../../domains/tag';
import { Pagination } from '../../../components';
import { TableContainer } from './shared';
import { BufferedInput } from '../../../components/input';
import { FilterUtils } from '../../../utility/filter/utils';
import { ComparisonOperator } from '../../../utility/filter';
import { TagNameSelect } from '../../../domains/tag/TagNameSelect';

const pageSize = 10;

export function TagPage() {
  const { data } = useSelector((state) => state.adminPage.tag);
  const dispatch = useDispatch();
  const tags = useSelector(TagSelectors.byIds(data.tags.ids));
  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [deletedTagId, setDeletedTagId] = React.useState(undefined);
  const [editedTagId, setEditedTagId] = React.useState(undefined);

  const [filters, setFilters] = React.useState({ id: '', name: '' });

  const load = React.useCallback(
    ({ pageable, query } = {}) =>
      dispatch(
        fetchTags.request(
          {
            pageable: pageable ? pageable : data.tags.pageable,
            query: query ? query : data.tags.query,
          },
          { target: Target.ADMIN_PAGE.TAG }
        )
      ),
    [data.tags]
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
                  {tags.map((tag) => (
                    <Table.Row key={tag.id}>
                      <Table.Cell>{tag.id}</Table.Cell>
                      <Table.Cell>{tag.name}</Table.Cell>
                      <Table.Cell collapsing>
                        <Button
                          icon="edit"
                          size="tiny"
                          onClick={() => setEditedTagId(tag.id)}
                        />
                        <Button
                          icon="delete"
                          negative
                          size="tiny"
                          onClick={() => setDeletedTagId(tag.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </TableContainer>
          )}
        </Segment>
        <Segment vertical>
          <Pagination
            activePage={data.tags.pageable.page + 1}
            totalPages={data.tags.totalPages}
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
      <Modal open={!!editedTagId} onClose={() => setEditedTagId(undefined)}>
        <Modal.Header>Edit tag</Modal.Header>
        <Modal.Content>
          <EditTagForm
            tagId={editedTagId}
            onCancel={() => setEditedTagId(undefined)}
            onSuccess={() => {
              setEditedTagId(false);
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
}
