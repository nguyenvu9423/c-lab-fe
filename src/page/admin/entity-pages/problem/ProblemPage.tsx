import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Table, Button } from 'semantic-ui-react';
import { addToast, fetchProblems, resetState } from '../../../../store/actions';
import { Target } from '../../../../store/reducers/target';
import { ConstSelectors, ProblemSelectors } from '../../../../store/selectors';
import { LoadingIndicator, Pagination } from '../../../../components';
import { CRUDToastBuilder } from '../../../../components/toast';

import { State } from '../../../../store';
import { Pageable } from '../../../../utility';
import {
  DataHolder,
  DataHolderState,
} from '../../../../store/reducers/data-holders/shared';
import { ProblemFilter } from './ProblemFilter';
import { AddButton, DeleteRowButton, EditRowButton } from '../shared';
import {
  AddProblemModal,
  DeleteProblemConfirm,
  EditProblemModal,
  RejudgeProblemModal,
  UpdateJudgeConfigModal,
} from '../../../../domains/problem';

const PAGE_SIZE = 10;

const initialPageable: Pageable = {
  page: 0,
  size: PAGE_SIZE,
};

export const ProblemPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.adminPage.problem);
  const problems = useSelector(
    DataHolder.isLoaded(data.problems)
      ? ProblemSelectors.byIds(data.problems.result)
      : ConstSelectors.value(undefined)
  );

  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [deletedProblemId, setDeletedProblemId] = React.useState<
    number | undefined
  >(undefined);

  const [openEditForm, setOpenEditForm] = React.useState<
    | { problemId: number; type: 'definition' | 'judge-config' | 'rejudge' }
    | undefined
  >(undefined);

  const pageable = DataHolder.usePageable(data.problems, initialPageable);
  const query = DataHolder.useQuery(data.problems);
  const totalPages = DataHolder.useTotalPages(data.problems);

  const load = React.useCallback(
    (params: { pageable?: Pageable; query?: string } = {}) => {
      dispatch(
        fetchProblems.request({
          pageable: params.pageable ?? pageable,
          query: params.query ?? query,
          target: Target.AdminPage.PROBLEM,
        })
      );
    },
    [dispatch, pageable, query]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.PROBLEM }));
    };
  }, []);

  DataHolder.useReloadHelper(data.problems, load);

  return (
    <>
      <Segment clearing>
        <Segment vertical>
          <AddButton label="Add problem" onClick={() => setOpenAddForm(true)} />
        </Segment>
        <Segment vertical>
          <ProblemFilter onChange={(query) => load({ query })} />
        </Segment>

        <Segment vertical clearing></Segment>
        <Segment vertical className="table-container admin-edit-entity">
          {DataHolderState.isLoading(data.problems) && <LoadingIndicator />}
          {DataHolderState.isLoaded(data.problems) && problems && (
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width="2">ID</Table.HeaderCell>
                  <Table.HeaderCell width="4">Code</Table.HeaderCell>
                  <Table.HeaderCell width="4">Title</Table.HeaderCell>
                  <Table.HeaderCell width="6" />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {problems?.map((problem) => (
                  <Table.Row key={problem.id}>
                    <Table.Cell>{problem.id}</Table.Cell>
                    <Table.Cell>{problem.code}</Table.Cell>
                    <Table.Cell>{problem.title}</Table.Cell>
                    <Table.Cell textAlign="right">
                      <EditRowButton
                        onClick={() =>
                          setOpenEditForm({
                            problemId: problem.id,
                            type: 'definition',
                          })
                        }
                      />
                      <Button
                        icon="setting"
                        size="tiny"
                        onClick={() =>
                          setOpenEditForm({
                            problemId: problem.id,
                            type: 'judge-config',
                          })
                        }
                      />
                      <Button
                        icon="redo"
                        size="tiny"
                        onClick={() =>
                          setOpenEditForm({
                            problemId: problem.id,
                            type: 'rejudge',
                          })
                        }
                      />
                      <DeleteRowButton
                        onClick={() => setDeletedProblemId(problem.id)}
                      />
                    </Table.Cell>
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
            onPageChange={(event, { activePage }) =>
              load({
                pageable: {
                  page: activePage - 1,
                  size: PAGE_SIZE,
                },
              })
            }
          />
        </Segment>
      </Segment>
      {openAddForm && (
        <AddProblemModal
          onCancel={() => setOpenAddForm(false)}
          onSuccess={() => {
            setOpenAddForm(false);
            load();
            dispatch(
              addToast(
                new CRUDToastBuilder('problem', 'create')
                  .setStatus('success')
                  .build()
              )
            );
          }}
        />
      )}

      {openEditForm?.type === 'definition' && (
        <EditProblemModal
          problemId={openEditForm.problemId}
          onCancel={() => setOpenEditForm(undefined)}
          onSuccess={() => {
            setOpenEditForm(undefined);
            dispatch(
              addToast(
                new CRUDToastBuilder('problem', 'update')
                  .setStatus('success')
                  .build()
              )
            );
          }}
        />
      )}

      {openEditForm?.type === 'judge-config' && (
        <UpdateJudgeConfigModal
          problemId={openEditForm.problemId}
          onCancel={() => setOpenEditForm(undefined)}
          onSuccess={() => {
            setOpenEditForm(undefined);
            dispatch(
              addToast(
                new CRUDToastBuilder('judge config', 'update')
                  .setStatus('success')
                  .build()
              )
            );
          }}
        />
      )}

      {openEditForm?.type === 'rejudge' && (
        <RejudgeProblemModal
          problemId={openEditForm.problemId}
          onCancel={() => setOpenEditForm(undefined)}
        />
      )}

      {deletedProblemId && (
        <DeleteProblemConfirm
          problemId={deletedProblemId}
          onCancel={() => setDeletedProblemId(undefined)}
          onSuccess={() => {
            setDeletedProblemId(undefined);
            load();
            dispatch(
              addToast(
                new CRUDToastBuilder('problem', 'delete')
                  .setStatus('success')
                  .build()
              )
            );
          }}
        />
      )}
    </>
  );
};
