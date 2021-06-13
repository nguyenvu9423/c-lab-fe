import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Segment,
  Table,
  Button,
  Modal,
  Confirm,
  Grid,
} from 'semantic-ui-react';
import { fetchProblems } from '../../../store/actions';
import { Target } from '../../../store/reducers/target';
import { ProblemSelectors } from '../../../store/selectors';
import { Pagination } from '../../../components';
import { LoadingState } from '../../../store/common';
import { TableContainer } from './shared';
import {
  AddProblemForm,
  EditProblemForm,
  ProblemCodeSelect,
  ProblemIdSelect,
} from '../../../domains/problem';
import { ProblemService } from '../../../service/ProblemService';
import { TagSelect } from '../../../domains/tag';
import { UserSelect } from '../../../domains/user/UserSelect';

export function ProblemPage() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.adminPage.problem);
  const problems = useSelector(ProblemSelectors.byIds(data.problems.ids));

  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [deletedProblemId, setDeletedProblemId] = React.useState(undefined);
  const [editedProblemId, setEditedProblemId] = React.useState(undefined);

  const [filters, setFilters] = React.useState({
    id: undefined,
    code: '',
    author: undefined,
    tags: [],
  });

  const load = React.useCallback(
    ({ pageable, filters } = {}) => {
      dispatch(
        fetchProblems.request(
          {
            pageable: pageable ? pageable : data.problems.pageable,
            filters: filters ? filters : data.problems.filters,
          },
          { target: Target.ADMIN_PAGE.PROBLEM }
        )
      );
    },
    [data.problems]
  );

  React.useEffect(() => load({ pageable: { page: 0, size: 10 } }), []);

  const handleFitlersChange = React.useCallback((filters) => {
    setFilters(filters);
    let query = '';
    if (filters.id) {
      query += `id==${filters.id}`;
    }
    if (filters.code) {
      query += `code==*${filters.code}*`;
    }
    if (filters.tags.length > 0) {
      query += `tags=include=(${filters.tags.map((tag) => tag.name)})`;
    }
    load({ filters: query });
  }, []);

  return (
    <>
      <Segment clearing>
        <Segment vertical clearing>
          <Grid widths={16} doubling stackable>
            <Grid.Row>
              <Grid.Column>
                <Button
                  icon="add"
                  label="Add problem"
                  primary
                  onClick={() => setOpenAddForm(true)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}>
                <ProblemIdSelect
                  onChange={(value) => {
                    handleFitlersChange({ ...filters, id: value });
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <ProblemCodeSelect
                  onChange={(value) => {
                    handleFitlersChange({ ...filters, code: value });
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <UserSelect
                  placeholder="Author"
                  onChange={(value) =>
                    handleFitlersChange({ ...filters, author: value })
                  }
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <TagSelect
                  onChange={(value) =>
                    handleFitlersChange({ ...filters, tags: value })
                  }
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment vertical>
          <TableContainer
            loading={LoadingState.isInProgress(data.problems.loadingState)}
          >
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Code</Table.HeaderCell>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell collapsing />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {problems.map((problem) => (
                  <Table.Row key={problem.id}>
                    <Table.Cell>{problem.id}</Table.Cell>
                    <Table.Cell>{problem.code}</Table.Cell>
                    <Table.Cell>{problem.title}</Table.Cell>
                    <Table.Cell collapsing>
                      <Button
                        icon="edit"
                        size="tiny"
                        onClick={() => setEditedProblemId(problem.id)}
                      />
                      <Button
                        icon="delete"
                        negative
                        size="tiny"
                        onClick={() => setDeletedProblemId(problem.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </TableContainer>
        </Segment>

        <Segment vertical>
          <Pagination
            floated="right"
            totalPages={data.problems.totalPages}
            activePage={data.problems.pageable.page + 1}
            onPageChange={(event, { activePage }) =>
              load({
                pageable: {
                  page: activePage - 1,
                  size: data.problems.pageable.size,
                },
              })
            }
          />
        </Segment>
      </Segment>
      <Modal open={openAddForm} onClose={() => setOpenAddForm(false)}>
        <Modal.Header>Add Problem</Modal.Header>
        <Modal.Content scrolling>
          <AddProblemForm
            onCancel={() => setOpenAddForm(false)}
            onSuccess={() => {
              setOpenAddForm(false);
              load();
            }}
          />
        </Modal.Content>
      </Modal>

      <Modal
        open={!!editedProblemId}
        onClose={() => setEditedProblemId(undefined)}
      >
        <Modal.Header>Edit Problem</Modal.Header>
        <Modal.Content scrolling>
          <EditProblemForm
            problemId={editedProblemId}
            onCancel={() => setEditedProblemId(undefined)}
            onSuccess={() => {
              setEditedProblemId(undefined);
              load();
            }}
          />
        </Modal.Content>
      </Modal>

      <Confirm
        open={!!deletedProblemId}
        header="Delete problem"
        onCancel={() => setDeletedProblemId(undefined)}
        onConfirm={() => {
          ProblemService.deleteProblem(deletedProblemId).then(() => {
            setDeletedProblemId(undefined);
            load();
          });
        }}
      />
    </>
  );
}
