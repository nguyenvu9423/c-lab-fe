import { State } from './../../../store/state';
import * as React from 'react';
import { addToast, fetchRoles } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Target } from '../../../store/reducers/target';
import { Segment, Table, Button } from 'semantic-ui-react';
import { ConstSelectors, RoleSelectors } from '../../../store/selectors';
import {
  ErrorMessage,
  LoadingIndicator,
  Pagination,
} from '../../../components';
import { AddRoleModal, EditRoleModal } from '../../../domains/role';
import { Pageable } from '../../../utility';
import { DataHolder } from '../../../store/reducers/data-holders/shared';
import { PAGE_SIZE } from '../../problems/components';
import { CRUDToastBuilder } from '../../../components/toast';

const initialPageable: Pageable = {
  page: 0,
  size: 10,
};

export const RolePage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.adminPage.role);
  const roles = useSelector(
    DataHolder.isLoaded(data.roles)
      ? RoleSelectors.selectByIds(data.roles.result)
      : ConstSelectors.value(undefined)
  );

  const pageable = DataHolder.usePageable(data.roles, initialPageable);
  const totalPages = DataHolder.useTotalPages(data.roles);

  const load = React.useCallback(
    (params: { pageable?: Pageable } = {}) => {
      dispatch(
        fetchRoles.request({
          pageable: params?.pageable ?? pageable,
          target: Target.AdminPage.ROLE,
        })
      );
    },
    [dispatch, pageable]
  );

  React.useEffect(() => load(), []);
  DataHolder.useReloadHelper(data.roles, load);

  const [editedRoleId, setEditedRoleId] = React.useState<number | undefined>();
  const [openAddForm, setOpenAddForm] = React.useState(false);

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
      <Segment vertical className="table-container admin-edit-entity">
        {DataHolder.isLoading(data.roles) && <LoadingIndicator />}
        {DataHolder.isError(data.roles) && (
          <ErrorMessage message={data.roles.error.message} />
        )}
        {DataHolder.isLoaded(data.roles) && roles && (
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
        )}
      </Segment>
      <Segment vertical>
        <Pagination
          floated="right"
          totalPages={totalPages}
          activePage={pageable.page + 1}
          onPageChange={(event, props) =>
            load({
              pageable: {
                page: props.activePage - 1,
                size: PAGE_SIZE,
              },
            })
          }
        />
      </Segment>
      {openAddForm && (
        <AddRoleModal
          onCancel={() => setOpenAddForm(false)}
          onSuccess={() => {
            setOpenAddForm(false);
            dispatch(
              addToast(
                new CRUDToastBuilder('role', 'create')
                  .setStatus('success')
                  .build()
              )
            );
            load();
          }}
        />
      )}

      {editedRoleId && (
        <EditRoleModal
          roleId={editedRoleId}
          onCancel={() => setEditedRoleId(undefined)}
          onSuccess={() => {
            setEditedRoleId(undefined);
            dispatch(
              addToast(
                new CRUDToastBuilder('role', 'update')
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
