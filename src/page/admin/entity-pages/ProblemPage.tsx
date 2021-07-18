import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Segment,
  Table,
  Button,
  Modal,
  Confirm,
  Grid,
  Tab,
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
import { State } from '../../../store';
import { Pageable } from '../../../utility';
import { UpdateJudgeConfigForm } from '../../../domains/judge-config/UpdateJudgeConfigForm';
import { ProblemRejudgeSegment } from '../../problems/components/ProblemRejudgeSegment';

const pageSize = 10;

const initialPageable: Pageable = {
  page: 0,
  size: pageSize,
};

export const ProblemPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.adminPage.problem);
  const problems = useSelector(
    data.problems.loadingState === LoadingState.LOADED
      ? ProblemSelectors.byIds(data.problems.result)
      : () => undefined
  );

  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [deletedProblemId, setDeletedProblemId] = React.useState<
    number | undefined
  >(undefined);
  const [editedProblemId, setEditedProblemId] = React.useState<
    number | undefined
  >(undefined);

  const [filters, setFilters] = React.useState({
    id: undefined,
    code: '',
    author: undefined,
    tags: [],
  });

  const currentPageable =
    data.problems.loadingState === LoadingState.LOAD_NEEDED
      ? initialPageable
      : data.problems.pageable;

  const load = React.useCallback(
    ({ pageable, filters } = {}) => {
      dispatch(
        fetchProblems.request({
          pageable: pageable ?? currentPageable,
          // filters: filters ? filters : data.problems.filters,
          target: Target.ADMIN_PAGE.PROBLEM,
        })
      );
    },
    [currentPageable]
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
                {problems?.map(
                  (problem) =>
                    problem && (
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
                    )
                )}
              </Table.Body>
            </Table>
          </TableContainer>
        </Segment>

        <Segment vertical>
          <Pagination
            floated="right"
            totalPages={
              data.problems.loadingState === LoadingState.LOADED
                ? data.problems.totalPages
                : currentPageable.page + 1
            }
            activePage={currentPageable.page + 1}
            onPageChange={(event, { activePage }) =>
              load({
                pageable: {
                  page: activePage - 1,
                  size: pageSize,
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
        closeIcon
        onClose={() => setEditedProblemId(undefined)}
        size="large"
      >
        <Modal.Header>Edit Problem</Modal.Header>
        <Modal.Content scrolling style={{ height: 629 }}>
          {editedProblemId && <EditForm problemId={editedProblemId} />}
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
};

const EditForm: React.FC<{ problemId: number; tab?: string }> = (props) => {
  const { problemId } = props;

  const panes = React.useMemo(() => {
    const style = {};
    return [
      {
        menuItem: 'Definition',
        render: function Definition() {
          return (
            <Tab.Pane style={style}>
              <EditProblemForm problemId={problemId} />
            </Tab.Pane>
          );
        },
      },
      {
        menuItem: 'Judge config',
        render: function JudgeConfig() {
          return (
            <Tab.Pane style={style}>
              <UpdateJudgeConfigForm problemId={problemId} />
            </Tab.Pane>
          );
        },
      },
      {
        menuItem: 'Rejudge',
        render: function Rejudge() {
          return (
            <Tab.Pane style={style}>
              <ProblemRejudgeSegment problemId={problemId} />
            </Tab.Pane>
          );
        },
      },
    ];
  }, []);

  return (
    <Tab
      style={{ height: '100%' }}
      menu={{ fluid: true, vertical: true, tabular: true }}
      panes={panes}
      defaultActiveIndex={0}
      grid={{ style: { height: '100%' }, paneWidth: 12, tabWidth: 4 }}
    />
  );
};

{
  /* <EditProblemForm
problemId={editedProblemId}
onCancel={() => setEditedProblemId(undefined)}
onSuccess={() => {
  setEditedProblemId(undefined);
  load();
}}
/> */
}
