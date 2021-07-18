import { State } from './../../../store/state';
import * as React from 'react';
import { fetchRoles } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Target } from '../../../store/reducers/target';
import { Segment, Table, Button, Modal } from 'semantic-ui-react';
import { TableContainer } from './shared';
import { RoleSelectors } from '../../../store/selectors';
import { Pagination } from '../../../components';
import { EditRoleForm, AddRoleForm } from '../../../domains/role';
import { Pageable } from '../../../utility';
import { LoadingState } from '../../../store/common';

const initialPageable: Pageable = {
  page: 0,
  size: 10,
};

export const RolePage: React.FC = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.adminPage.role);

  const currentPageable: Pageable =
    data.roles.loadingState !== LoadingState.LOAD_NEEDED
      ? data.roles.pageable
      : initialPageable;

  const load = React.useCallback(
    (params?: { pageable?: Pageable }) => {
      dispatch(
        fetchRoles.request({
          pageable: params?.pageable ?? currentPageable,
          target: Target.ADMIN_PAGE.ROLE,
        })
      );
    },
    [currentPageable]
  );

  React.useEffect(() => load({ pageable: { page: 0, size: 10 } }), []);

  const [editedRoleId, setEditedRoleId] = React.useState<number | undefined>();
  const [openAddForm, setOpenAddForm] = React.useState(false);

  const roles = useSelector(
    data.roles.loadingState === LoadingState.LOADED
      ? RoleSelectors.byIds(data.roles.result)
      : () => undefined
  );

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
        <TableContainer
          loading={data.roles.loadingState === LoadingState.LOADING}
        >
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell collapsing />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.roles.loadingState === LoadingState.LOADED &&
                roles &&
                roles.map(
                  (role) =>
                    role && (
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
                    )
                )}
            </Table.Body>
          </Table>
        </TableContainer>
        <Pagination
          floated="right"
          totalPages={
            data.roles.loadingState === LoadingState.LOADED
              ? data.roles.totalPages
              : currentPageable.page + 1
          }
          activePage={currentPageable.page + 1}
          onPageChange={(event, props) =>
            load({
              pageable: {
                page: props.activePage - 1,
                size: currentPageable.size,
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
          {editedRoleId && (
            <EditRoleForm
              roleId={editedRoleId}
              onCancel={handleClose}
              onSuccess={handleClose}
            />
          )}
        </Modal.Content>
      </Modal>
    </Segment>
  );
};
