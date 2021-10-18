import * as React from 'react';
import { Segment, Table } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { EditRowButton } from '../shared';
import { addToast, fetchUsers, resetState } from '../../../../store/actions';
import { Target } from '../../../../store/reducers/target';
import { ConstSelectors, UserSelectors } from '../../../../store/selectors';
import { Pagination } from '../../../../components';
import { EditUserModal } from '../../../../domains/user';
import { State } from '../../../../store';
import { Pageable } from '../../../../utility';
import { DataHolder } from '../../../../store/reducers/data-holders/shared';
import { UserFilter } from './UserFilter';
import { CRUDToastBuilder } from '../../../../components/toast';
import { ErrorTableBody, LoadingTableBody } from '../../../../components/table';

const PAGE_SIZE = 10;

const initialPageable: Pageable = {
  page: 0,
  size: PAGE_SIZE,
};

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

  const pageable = DataHolder.usePageable(data.users, initialPageable);
  const query = DataHolder.useQuery(data.users);
  const totalPages = DataHolder.useTotalPages(data.users);

  const load = React.useCallback(
    (params: { pageable?: Pageable; query?: string } = {}) => {
      dispatch(
        fetchUsers.request({
          pageable: params.pageable ?? pageable,
          query: params.query ?? query,
          target: Target.AdminPage.USER,
        })
      );
    },
    [dispatch, pageable, query]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.USER }));
    };
  }, []);

  DataHolder.useReloadHelper(data.users);

  return (
    <Segment clearing>
      <Segment vertical clearing>
        <UserFilter onChange={(query) => load({ query })} />
      </Segment>
      <Segment className="table-container" vertical style={{ height: 600 }}>
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
                  <Table.Cell>{user.username}</Table.Cell>
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
          totalPages={totalPages}
          activePage={pageable.page + 1}
          onPageChange={(event, { activePage }) => {
            if (typeof activePage === 'number') {
              load({
                pageable: {
                  page: activePage - 1,
                  size: PAGE_SIZE,
                },
              });
            }
          }}
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
