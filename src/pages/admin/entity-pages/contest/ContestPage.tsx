import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Segment, Table } from 'semantic-ui-react';
import moment from 'moment';

import { State } from '@/store/state';
import { addToast, fetchContests, resetState } from '@/store/actions';
import { Target } from '@/store/reducers/target';
import {
  DataHolder,
  DataHolderState,
} from '@/store/reducers/data-holders/shared';
import { ConstSelectors, ContestSelectors } from '@/store/selectors';
import { UserPageLink } from '@/domain-ui/user';
import {
  AddContestModal,
  ContestPageLink,
  DeleteContestConfirm,
  EditContestModal,
  RejudgeContestModal,
} from '@/domain-ui/contest';
import { PageUtils } from 'src/pages/shared';
import { LoadingTableBody } from '@/components/table';
import { CRUDToastBuilder } from '@/components/toast';
import { UpdateContestJudgeConfigModal } from '@/domain-ui/contest/modals/UpdateContestJudgeConfigModal';
import { Pagination } from '../../../../components';
import { AddButton, DeleteRowButton, EditRowButton } from '../shared';
import { ContestFilter } from './ContestFilter';

const PAGE_SIZE = 10;

type EditFormType = 'definition' | 'judge-config' | 'rejudge';

export const ContestPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.adminPage.contest);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState<string | undefined>();
  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState<
    { contestId: number; type: EditFormType } | undefined
  >(undefined);
  const [deletedContestId, setDeletedContestId] = React.useState<
    number | undefined
  >(undefined);

  const load = useCallback(() => {
    dispatch(
      fetchContests.request({
        pageable: { page, size: PAGE_SIZE },
        query,
        target: Target.AdminPage.CONTEST,
      }),
    );
  }, [dispatch, page, query]);

  useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.CONTEST }));
    };
  }, [page, query]);

  const contests = useSelector(
    DataHolder.isLoaded(data.contests)
      ? ContestSelectors.byIds(data.contests.result)
      : ConstSelectors.value(undefined),
  );

  const loadTotalPages = DataHolder.useTotalPages(data.contests);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);
  return (
    <>
      <Segment clearing>
        <Segment vertical>
          <AddButton label="Thêm" onClick={() => setOpenAddForm(true)} />
        </Segment>
        <Segment vertical>
          <ContestFilter onChange={setQuery} />
        </Segment>

        <Segment
          className="table-container"
          vertical
          size="small"
          style={{ minHeight: 580 }}
        >
          <Table basic="very" fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                <Table.HeaderCell width={3}>Tên</Table.HeaderCell>
                <Table.HeaderCell width={2}>Người tạo</Table.HeaderCell>
                <Table.HeaderCell width={2} textAlign="center">
                  Bắt đầu
                </Table.HeaderCell>
                <Table.HeaderCell width={2} textAlign="center">
                  Thời gian
                </Table.HeaderCell>
                <Table.HeaderCell width={3}></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {DataHolderState.isLoading(data.contests) && <LoadingTableBody />}
            {DataHolderState.isLoaded(data.contests) && contests && (
              <Table.Body>
                {contests?.map((contest) => {
                  return (
                    <Table.Row key={contest.id}>
                      <Table.Cell>{contest.id}</Table.Cell>
                      <Table.Cell>
                        <ContestPageLink id={contest.id}>
                          {contest.name}
                        </ContestPageLink>
                      </Table.Cell>
                      <Table.Cell>
                        <UserPageLink
                          userId={contest.author.id}
                          username={contest.author.username}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {moment(contest.start)
                          .local()
                          .format('HH:mm DD-MM-yyyy')}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {moment(contest.end).diff(contest.start, 'minutes')}{' '}
                        phút
                      </Table.Cell>
                      <Table.Cell>
                        <EditRowButton
                          onClick={() =>
                            setOpenEditForm({
                              contestId: contest.id,
                              type: 'definition',
                            })
                          }
                        />
                        <Button
                          icon="setting"
                          size="tiny"
                          onClick={() =>
                            setOpenEditForm({
                              contestId: contest.id,
                              type: 'judge-config',
                            })
                          }
                        />
                        <Button
                          icon="redo"
                          size="tiny"
                          onClick={() =>
                            setOpenEditForm({
                              contestId: contest.id,
                              type: 'rejudge',
                            })
                          }
                        />
                        <DeleteRowButton
                          onClick={() => setDeletedContestId(contest.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            )}
          </Table>
        </Segment>
        <Segment vertical>
          <Pagination
            floated="right"
            totalPages={totalPages ?? 0}
            activePage={page}
            onPageChange={(_e, { activePage }) => setPage(Number(activePage))}
          />
        </Segment>
      </Segment>

      {openAddForm && (
        <AddContestModal
          onCancel={() => setOpenAddForm(false)}
          onSuccess={() => {
            setOpenAddForm(false);
            load();
            dispatch(
              addToast(
                new CRUDToastBuilder('Kỳ thi', 'tạo')
                  .setStatus('success')
                  .build(),
              ),
            );
          }}
        />
      )}

      {openEditForm?.type === 'definition' && (
        <EditContestModal
          contestId={openEditForm.contestId}
          onCancel={() => setOpenEditForm(undefined)}
          onSuccess={() => {
            setOpenEditForm(undefined);
            dispatch(
              addToast(
                new CRUDToastBuilder('Kỳ thi', 'sửa')
                  .setStatus('success')
                  .build(),
              ),
            );
          }}
        />
      )}

      {openEditForm?.type === 'judge-config' && (
        <UpdateContestJudgeConfigModal
          contestId={openEditForm.contestId}
          onCancel={() => setOpenEditForm(undefined)}
          onSuccess={() => {
            setOpenEditForm(undefined);
            dispatch(
              addToast(
                new CRUDToastBuilder('cài đặt chấm', 'sửa')
                  .setStatus('success')
                  .build(),
              ),
            );
          }}
        />
      )}

      {openEditForm?.type === 'rejudge' && (
        <RejudgeContestModal
          contestId={openEditForm.contestId}
          onCancel={() => setOpenEditForm(undefined)}
        />
      )}

      {deletedContestId && (
        <DeleteContestConfirm
          contestId={deletedContestId}
          onCancel={() => setDeletedContestId(undefined)}
          onSuccess={() => {
            setDeletedContestId(undefined);
            load();
            dispatch(
              addToast(
                new CRUDToastBuilder('Kỳ thi', 'xóa')
                  .setStatus('success')
                  .build(),
              ),
            );
          }}
          onError={(error) => {
            setDeletedContestId(undefined);
            dispatch(
              addToast(
                new CRUDToastBuilder('Kỳ thi', 'xóa')
                  .setStatus('failed')
                  .setMessage(error.message)
                  .build(),
              ),
            );
          }}
        />
      )}
    </>
  );
};
