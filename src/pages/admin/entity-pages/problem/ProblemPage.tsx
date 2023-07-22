import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Table, Button } from 'semantic-ui-react';
import { addToast, fetchProblems, resetState } from '@/store/actions';
import { Target } from '@/store/reducers/target';
import { CRUDToastBuilder } from '@/components/toast';
import { ConstSelectors, ProblemSelectors } from '@/store/selectors';
import { Pagination } from '../../../../components';

import { State } from '../../../../store';
import {
  DataHolder,
  DataHolderState,
} from '@/store/reducers/data-holders/shared';
import { ProblemFilter } from './ProblemFilter';
import { AddButton, DeleteRowButton, EditRowButton } from '../shared';
import {
  AddProblemModal,
  DeleteProblemConfirm,
  EditProblemModal,
  RejudgeProblemModal,
  UpdateJudgeConfigModal,
} from '@/domain-ui/problem';
import { LoadingTableBody, ErrorTableBody } from '@/components/table';
import { ProblemPageLink } from '../../../problems/problem-page/ProblemPageLink';
import { PageUtils } from '../../../shared';

const PAGE_SIZE = 10;

export const ProblemPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.adminPage.problem);
  const problems = useSelector(
    DataHolder.isLoaded(data.problems)
      ? ProblemSelectors.byIds(data.problems.result)
      : ConstSelectors.value(undefined)
  );

  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [deletedProblemCode, setDeletedProblemCode] = React.useState<
    string | undefined
  >(undefined);

  const [openEditForm, setOpenEditForm] = React.useState<
    | { problemCode: string; type: 'definition' | 'judge-config' | 'rejudge' }
    | undefined
  >(undefined);

  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState<string | undefined>();
  const loadTotalPages = DataHolder.useTotalPages(data.problems);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);
  PageUtils.useCorrectPageListener(page, totalPages, setPage);

  const load = React.useCallback(() => {
    dispatch(
      fetchProblems.request({
        pageable: { page, size: PAGE_SIZE },
        query,
        target: Target.AdminPage.PROBLEM,
      })
    );
  }, [dispatch, page, query]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.PROBLEM }));
    };
  }, [load, dispatch]);

  return (
    <>
      <Segment clearing>
        <Segment vertical>
          <AddButton label="Thêm" onClick={() => setOpenAddForm(true)} />
        </Segment>
        <Segment vertical>
          <ProblemFilter onChange={setQuery} />
        </Segment>

        <Segment
          className="table-container"
          vertical
          style={{ minHeight: 600 }}
        >
          <Table basic="very" fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width="2">ID</Table.HeaderCell>
                <Table.HeaderCell width="4">Mã bài</Table.HeaderCell>
                <Table.HeaderCell width="4">Tiêu đề</Table.HeaderCell>
                <Table.HeaderCell width="6" />
              </Table.Row>
            </Table.Header>
            {DataHolderState.isLoading(data.problems) && <LoadingTableBody />}
            {DataHolderState.isLoaded(data.problems) && problems && (
              <Table.Body>
                {problems.map((problem) => (
                  <Table.Row key={problem.id}>
                    <Table.Cell>
                      <ProblemPageLink code={problem.code}>
                        {problem.id}
                      </ProblemPageLink>
                    </Table.Cell>
                    <Table.Cell>
                      <ProblemPageLink code={problem.code}>
                        {problem.code}
                      </ProblemPageLink>
                    </Table.Cell>
                    <Table.Cell>{problem.title}</Table.Cell>
                    <Table.Cell textAlign="right">
                      <EditRowButton
                        onClick={() =>
                          setOpenEditForm({
                            problemCode: problem.code,
                            type: 'definition',
                          })
                        }
                      />
                      <Button
                        icon="setting"
                        size="tiny"
                        onClick={() =>
                          setOpenEditForm({
                            problemCode: problem.code,
                            type: 'judge-config',
                          })
                        }
                      />
                      <Button
                        icon="redo"
                        size="tiny"
                        onClick={() =>
                          setOpenEditForm({
                            problemCode: problem.code,
                            type: 'rejudge',
                          })
                        }
                      />
                      <DeleteRowButton
                        onClick={() => setDeletedProblemCode(problem.code)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            )}
            {DataHolder.isError(data.problems) && <ErrorTableBody />}
          </Table>
        </Segment>

        <Segment vertical>
          <Pagination
            floated="right"
            totalPages={totalPages || 0}
            activePage={page}
            onPageChange={(e, { activePage }) => setPage(Number(activePage))}
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
                new CRUDToastBuilder('bài tập', 'tạo')
                  .setStatus('success')
                  .build()
              )
            );
          }}
        />
      )}

      {openEditForm?.type === 'definition' && (
        <EditProblemModal
          problemCode={openEditForm.problemCode}
          onCancel={() => setOpenEditForm(undefined)}
          onSuccess={() => {
            setOpenEditForm(undefined);
            dispatch(
              addToast(
                new CRUDToastBuilder('bài tập', 'sửa')
                  .setStatus('success')
                  .build()
              )
            );
          }}
        />
      )}

      {openEditForm?.type === 'judge-config' && (
        <UpdateJudgeConfigModal
          problemCode={openEditForm.problemCode}
          onCancel={() => setOpenEditForm(undefined)}
          onSuccess={() => {
            setOpenEditForm(undefined);
            dispatch(
              addToast(
                new CRUDToastBuilder('cài đặt chấm', 'sửa')
                  .setStatus('success')
                  .build()
              )
            );
          }}
        />
      )}

      {openEditForm?.type === 'rejudge' && (
        <RejudgeProblemModal
          problemCode={openEditForm.problemCode}
          onCancel={() => setOpenEditForm(undefined)}
        />
      )}

      {deletedProblemCode && (
        <DeleteProblemConfirm
          problemCode={deletedProblemCode}
          onCancel={() => setDeletedProblemCode(undefined)}
          onSuccess={() => {
            setDeletedProblemCode(undefined);
            load();
            dispatch(
              addToast(
                new CRUDToastBuilder('bài tập', 'xóa')
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
