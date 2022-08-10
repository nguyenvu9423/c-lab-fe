import * as React from 'react';
import { Segment, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { EditRowButton } from '../shared';
import { addToast, fetchUsers, resetState } from '../../../../store/actions';
import { Target } from '../../../../store/reducers/target';
import { ConstSelectors, UserSelectors } from '../../../../store/selectors';
import { Pagination } from '../../../../components';
import { EditUserModal, UserPageLink } from '../../../../domains/user';
import { State } from '../../../../store';
import { DataHolder } from '../../../../store/reducers/data-holders/shared';
import { UserFilter } from './UserFilter';
import { CRUDToastBuilder } from '../../../../components/toast';
import { ErrorTableBody, LoadingTableBody } from '../../../../components/table';
import { PageUtils } from '../../../shared';

const PAGE_SIZE = 10;

export const UserPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.adminPage.user);
  const users = useSelector(
    DataHolder.isLoaded(data.users)
      ? UserSelectors.selectByIds(data.users.result)
      : ConstSelectors.value(undefined)
  );

  const [openEditForm, setOpenEditForm] = React.useState<
    { username: string; type: 'definition' | 'status' } | undefined
  >(undefined);

  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState<string | undefined>();
  const loadTotalPages = DataHolder.useTotalPages(data.users);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);
  PageUtils.useCorrectPageListener(page, totalPages, setPage);

  const load = React.useCallback(() => {
    dispatch(
      fetchUsers.request({
        pageable: { page, size: PAGE_SIZE },
        query,
        target: Target.AdminPage.USER,
      })
    );
  }, [dispatch, page, query]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.USER }));
    };
  }, [load, dispatch]);

  return (
    <Segment clearing>
      <Segment vertical clearing>
        <UserFilter onChange={setQuery} />
      </Segment>
      <Segment className="table-container" vertical style={{ minHeight: 600 }}>
        <Table basic="very" fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width="2">ID</Table.HeaderCell>
              <Table.HeaderCell width="4">Tên đăng nhập</Table.HeaderCell>
              <Table.HeaderCell width="4">Tên</Table.HeaderCell>
              <Table.HeaderCell width="4">Họ</Table.HeaderCell>
              <Table.HeaderCell width="2" />
            </Table.Row>
          </Table.Header>
          {DataHolder.isLoading(data.users) && <LoadingTableBody />}

          {DataHolder.isLoaded(data.users) && users && (
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>
                    <UserPageLink username={user.username} />
                  </Table.Cell>
                  <Table.Cell>{user.firstName}</Table.Cell>
                  <Table.Cell>{user.lastName}</Table.Cell>
                  <Table.Cell textAlign="right">
                    <EditRowButton
                      onClick={() =>
                        setOpenEditForm({
                          username: user.username,
                          type: 'definition',
                        })
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}

          {DataHolder.isError(data.users) && (
            <ErrorTableBody message={data.users.error.message} />
          )}
        </Table>
      </Segment>
      <Segment vertical>
        <Pagination
          floated="right"
          totalPages={totalPages || 0}
          activePage={page}
          onPageChange={(event, { activePage }) => setPage(Number(activePage))}
        />
      </Segment>
      {openEditForm && openEditForm.type === 'definition' && (
        <EditUserModal
          username={openEditForm.username}
          onCancel={() => setOpenEditForm(undefined)}
          onSuccess={() => {
            setOpenEditForm(undefined);
            dispatch(
              addToast(
                new CRUDToastBuilder('thông tin người dùng', 'sửa')
                  .setStatus('success')
                  .build()
              )
            );
            load();
          }}
        />
      )}
    </Segment>
  );
};
