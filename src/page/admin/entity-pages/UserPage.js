import * as React from 'react';
import { Segment, Table, Button, Modal } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { TableContainer } from './shared';
import { fetchUsers } from '../../../store/actions';
import { Target } from '../../../store/reducers/target';
import { UserSelectors } from '../../../store/selectors';
import { Pagination } from '../../../components';
import { EditUserForm } from '../../../domains/user';

export function UserPage() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.adminPage.user);
  const users = useSelector(UserSelectors.byIds(data.users.ids));

  const [editedUserId, setEditedUserId] = React.useState(undefined);

  const load = React.useCallback(
    ({ pageable, filters } = {}) => {
      dispatch(
        fetchUsers.request(
          {
            pageable: pageable ? pageable : data.users.pageable,
            filters: filters ? filters : data.users.filters
          },
          { target: Target.ADMIN_PAGE.USER }
        )
      );
    },
    [data.users]
  );

  React.useEffect(() => load(), []);

  return (
    <>
      <Segment clearing>
        <TableContainer>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell collapsing />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map(user => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.firstName}</Table.Cell>
                  <Table.Cell>{user.lastName}</Table.Cell>
                  <Table.HeaderCell collapsing>
                    <Button
                      icon="edit"
                      size="tiny"
                      onClick={() => setEditedUserId(user.id)}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </TableContainer>
        <Pagination
          floated="right"
          totalPages={data.users.totalPages}
          activePage={data.users.pageable.page + 1}
          onPageChange={(event, props) =>
            load({
              pageable: {
                page: props.activePage - 1,
                size: data.users.pageable.size
              }
            })
          }
        />
      </Segment>
      <Modal open={!!editedUserId} onClose={() => setEditedUserId(undefined)}>
        <Modal.Header>Edit user</Modal.Header>
        <Modal.Content scrolling>
          <EditUserForm
            userId={editedUserId}
            onCancel={() => setEditedUserId(undefined)}
            onSuccess={() => {
              setEditedUserId(undefined);
              load();
            }}
          />
        </Modal.Content>
      </Modal>
    </>
  );
}
