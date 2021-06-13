import * as React from 'react';
import { fetchRoles } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Target } from '../../../store/reducers/target';
import { Segment, Table, Button, Modal } from 'semantic-ui-react';
import { TableContainer } from './shared';
import { RoleSelectors } from '../../../store/selectors';
import { Pagination } from '../../../components';
import { EditRoleForm, AddRoleForm } from '../../../domains/role';

export function RolePage() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.adminPage.role);

  const load = React.useCallback(({ pageable }) => {
    dispatch(
      fetchRoles.request(
        {
          pageable: pageable ?? data.roles.pageable,
        },
        { target: Target.ADMIN_PAGE.ROLE }
      )
    );
  }, []);

  React.useEffect(() => load({ pageable: { page: 0, size: 10 } }), []);

  const [editedRoleId, setEditedRoleId] = React.useState();
  const [openAddForm, setOpenAddForm] = React.useState(false);

  const roles = useSelector(RoleSelectors.byIds(data.roles.ids));

  const handleClose = React.useCallback(() => setEditedRoleId(undefined), []);

  return (
    <Segment clearing>
      <Segment vertical clearing>
        <Button
          icon="add"
          label="Add role"
          primary
          onClick={() => setOpenAddForm(true)}
        />
      </Segment>
      <Segment vertical>
        <TableContainer props={data.roles.loadingState}>
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell collapsing />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {roles.map((role) => (
                <Table.Row key={role.id}>
                  <Table.Cell>{role.id}</Table.Cell>
                  <Table.Cell>{role.name}</Table.Cell>
                  <Table.HeaderCell collapsing>
                    <Button
                      icon="edit"
                      size="tiny"
                      onClick={() => {
                        setEditedRoleId(role.id);
                      }}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </TableContainer>
        <Pagination
          floated="right"
          totalPages={data.roles.totalPages}
          activePage={data.roles.pageable.page + 1}
          onPageChange={(event, props) =>
            load({
              pageable: {
                page: props.activePage - 1,
                size: data.roles.pageable.size,
              },
            })
          }
        />
      </Segment>
      <Modal open={openAddForm} onClose={() => setOpenAddForm(false)}>
        <Modal.Header>Add article</Modal.Header>
        <Modal.Content>
          <AddRoleForm
            onCancel={() => setOpenAddForm(false)}
            onSuccess={() => {
              setOpenAddForm(false);
              load();
            }}
          />
        </Modal.Content>
      </Modal>

      <Modal open={!!editedRoleId} onClose={handleClose}>
        <Modal.Header>Edit role</Modal.Header>
        <Modal.Content>
          <EditRoleForm
            roleId={editedRoleId}
            onCancel={handleClose}
            onSuccess={handleClose}
          />
        </Modal.Content>
      </Modal>
    </Segment>
  );
}
