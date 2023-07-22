import { State } from '@/store/state';
import * as React from 'react';
import { addToast, fetchRoles } from '@/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Target } from '@/store/reducers/target';
import { Segment, Table, Button } from 'semantic-ui-react';
import { ConstSelectors, RoleSelectors } from '@/store/selectors';
import { Pagination } from '../../../components';
import { AddRoleModal, EditRoleModal } from '@/domain-ui/role';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { PAGE_SIZE } from '../../problems/components';
import { CRUDToastBuilder } from '@/components/toast';
import { ErrorTableBody, LoadingTableBody } from '@/components/table';
import { PageUtils } from '../../shared';

export const RolePage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.adminPage.role);
  const roles = useSelector(
    DataHolder.isLoaded(data.roles)
      ? RoleSelectors.selectByIds(data.roles.result)
      : ConstSelectors.value(undefined)
  );

  const [page, setPage] = React.useState(1);

  const loadTotalPages = DataHolder.useTotalPages(data.roles);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);

  const load = React.useCallback(() => {
    dispatch(
      fetchRoles.request({
        pageable: { page, size: PAGE_SIZE },
        target: Target.AdminPage.ROLE,
      })
    );
  }, [dispatch, page]);

  React.useEffect(() => load(), [load]);
  PageUtils.useCorrectPageListener(page, totalPages, setPage);

  const [editedRoleId, setEditedRoleId] = React.useState<number | undefined>();
  const [openAddForm, setOpenAddForm] = React.useState(false);

  return (
    <Segment clearing>
      <Segment vertical clearing>
        <Button
          icon="add"
          label="Thêm"
          primary
          onClick={() => setOpenAddForm(true)}
        />
      </Segment>
      <Segment className="table-container" vertical style={{ minHeight: 600 }}>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>ID</Table.HeaderCell>
              <Table.HeaderCell width={10}>Tên</Table.HeaderCell>
              <Table.HeaderCell width={4} />
            </Table.Row>
          </Table.Header>
          {DataHolder.isLoading(data.roles) && <LoadingTableBody />}
          {DataHolder.isLoaded(data.roles) && roles && (
            <Table.Body>
              {roles.map((role) => (
                <Table.Row key={role.id}>
                  <Table.Cell>{role.id}</Table.Cell>
                  <Table.Cell>{role.name}</Table.Cell>
                  <Table.Cell textAlign="right">
                    <Button
                      icon="edit"
                      size="tiny"
                      onClick={() => {
                        setEditedRoleId(role.id);
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
          {DataHolder.isError(data.roles) && (
            <ErrorTableBody message={data.roles.error.message} />
          )}
        </Table>
      </Segment>
      <Segment vertical>
        <Pagination
          floated="right"
          totalPages={totalPages || 0}
          activePage={page + 1}
          onPageChange={(event, { activePage }) => setPage(Number(activePage))}
        />
      </Segment>
      {openAddForm && (
        <AddRoleModal
          onCancel={() => setOpenAddForm(false)}
          onSuccess={() => {
            setOpenAddForm(false);
            dispatch(
              addToast(
                new CRUDToastBuilder('vai trò', 'tạo')
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
                new CRUDToastBuilder('vài trò', 'sửa')
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
