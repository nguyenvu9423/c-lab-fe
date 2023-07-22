import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Table } from 'semantic-ui-react';
import { fetchTags, resetState } from '@/store/actions';
import { Target } from '@/store/reducers/target';
import { TagSelectors } from '@/store/selectors/TagSelectors';
import { DeleteTagConfirm, AddTagModal, EditTagModal } from '@/domain-ui/tag';
import { Pagination } from '@/components';
import { AddButton, DeleteRowButton, EditRowButton } from '../shared';
import { State } from '@/store';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { ConstSelectors } from '@/store/selectors';
import { TagFilter } from './TagFilter';
import { ErrorTableBody, LoadingTableBody } from '@/components/table';
import { PageUtils } from '../../../shared';

const PAGE_SIZE = 10;

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

  const query = DataHolder.useQuery(data.tags);
  const [page, setPage] = React.useState(1);
  const loadTotalPages = DataHolder.useTotalPages(data.tags);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);
  PageUtils.useCorrectPageListener(page, totalPages, setPage);

  const load = React.useCallback(
    (params: { query?: string } = {}) =>
      dispatch(
        fetchTags.request({
          pageable: { page, size: PAGE_SIZE },
          query: params.query ?? query,
          target: Target.AdminPage.TAG,
        })
      ),
    [dispatch, page, query]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.TAG }));
    };
  }, [load, dispatch]);

  return (
    <>
      <Segment clearing>
        <Segment vertical>
          <AddButton label="Thêm" onClick={() => setOpenAddForm(true)} />
        </Segment>
        <Segment vertical clearing>
          <TagFilter onChange={(query) => load({ query })} />
        </Segment>
        <Segment
          className="table-container"
          vertical
          style={{ minHeight: 600 }}
        >
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
            activePage={page}
            totalPages={totalPages || 0}
            floated="right"
            onPageChange={(e, { activePage }) => setPage(Number(activePage))}
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
