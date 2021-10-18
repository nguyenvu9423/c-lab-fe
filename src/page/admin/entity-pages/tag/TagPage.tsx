import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Table } from 'semantic-ui-react';
import { fetchTags, resetState } from '../../../../store/actions';
import { Target } from '../../../../store/reducers/target';
import { TagSelectors } from '../../../../store/selectors/TagSelectors';
import {
  DeleteTagConfirm,
  AddTagModal,
  EditTagModal,
} from '../../../../domains/tag';
import { Pagination } from '../../../../components';
import { AddButton, DeleteRowButton, EditRowButton } from '../shared';
import { State } from '../../../../store';
import { Pageable } from '../../../../utility';
import { DataHolder } from '../../../../store/reducers/data-holders/shared';
import { ConstSelectors } from '../../../../store/selectors';

import { TagFilter } from './TagFilter';
import { ErrorTableBody, LoadingTableBody } from '../../../../components/table';

const pageSize = 10;

const initialPageable: Pageable = {
  page: 0,
  size: pageSize,
};

export const TagPage: React.FC = () => {
  const { data } = useSelector((state: State) => state.adminPage.tag);
  const dispatch = useDispatch();
  const tags = useSelector(
    DataHolder.isLoaded(data.tags)
      ? TagSelectors.selectByIds(data.tags.result)
      : ConstSelectors.value(undefined)
  );
  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [editedTagId, setEditedTagId] = React.useState<number | undefined>();
  const [deletedTagId, setDeletedTagId] = React.useState<number | undefined>();

  const pageable = DataHolder.usePageable(data.tags, initialPageable);
  const query = DataHolder.useQuery(data.tags);
  const totalPages = DataHolder.useTotalPages(data.tags);

  const load = React.useCallback(
    (params: { pageable?: Pageable; query?: string } = {}) =>
      dispatch(
        fetchTags.request({
          pageable: params.pageable ?? pageable,
          query: params.query ?? query,
          target: Target.AdminPage.TAG,
        })
      ),
    [dispatch, pageable, query]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.TAG }));
    };
  }, []);

  DataHolder.useReloadHelper(data.tags, load);
  return (
    <>
      <Segment clearing>
        <Segment vertical>
          <AddButton label="Thêm" onClick={() => setOpenAddForm(true)} />
        </Segment>
        <Segment vertical clearing>
          <TagFilter onChange={(query) => load({ query })} />
        </Segment>
        <Segment className="table-container" vertical style={{ height: 600 }}>
          <Table basic="very" fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2}>ID</Table.HeaderCell>
                <Table.HeaderCell width={10}>Tên</Table.HeaderCell>
                <Table.HeaderCell width={4} />
              </Table.Row>
            </Table.Header>
            {DataHolder.isLoading(data.tags) && <LoadingTableBody />}
            {DataHolder.isLoaded(data.tags) && tags && (
              <Table.Body>
                {tags.map((tag) => (
                  <Table.Row key={tag.id}>
                    <Table.Cell>{tag.id}</Table.Cell>
                    <Table.Cell>{tag.name}</Table.Cell>
                    <Table.Cell textAlign="right">
                      <EditRowButton onClick={() => setEditedTagId(tag.id)} />
                      <DeleteRowButton
                        onClick={() => setDeletedTagId(tag.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
            {DataHolder.isError(data.tags) && (
              <ErrorTableBody message={data.tags.error.message} />
            )}
          </Table>
        </Segment>
        <Segment vertical>
          <Pagination
            activePage={pageable.page + 1}
            totalPages={totalPages}
            floated="right"
            onPageChange={(event, { activePage }) => {
              load({
                pageable: { page: Number(activePage) - 1, size: pageSize },
              });
            }}
          />
        </Segment>
      </Segment>
      {openAddForm && (
        <AddTagModal
          onCancel={() => setOpenAddForm(false)}
          onSuccess={() => {
            setOpenAddForm(false);
            load();
          }}
        />
      )}

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

      {editedTagId && (
        <EditTagModal
          tagId={editedTagId}
          onCancel={() => setEditedTagId(undefined)}
          onSuccess={() => {
            setEditedTagId(undefined);
            load();
          }}
        />
      )}
    </>
  );
};
