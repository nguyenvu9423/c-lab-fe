import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Ref, Segment, Table } from 'semantic-ui-react';

import { Pagination } from '@/components';
import { ErrorTableBody, LoadingTableBody } from '@/components/table';
import { JudgeStatusLabel, useJudgesStream } from '@/domain-ui/judge';
import { Submission } from '@/domains/submission';
import { State } from '@/store';
import { fetchSubmissions, resetState } from '@/store/actions';
import {
  DataHolder,
  DataHolderState,
} from '@/store/reducers/data-holders/shared';
import { Target } from '@/store/reducers/target';
import { SubmissionSelectors } from '@/store/selectors';
import { JudgeSelectors } from '@/store/selectors/JudgeSelectors';
import { scrollToElementTop } from '@/utils';
import { DateTimeUtils } from '@/utils/data-type/DateTimeUtils';
import { formatResourceMemory, formatResourceTime } from '../../problems/utils';
import { PageUtils } from '../../shared';
import { SubmissionDetailsLink } from '@/domain-ui/submission';
import { SubmissionsTable } from '../../problems/components';

export namespace UserSubsCard {
  export interface Props {
    username: string;
  }
}

const PAGE_SIZE = 5;

export const UserSubsCard: React.FC<UserSubsCard.Props> = (props) => {
  const { username } = props;
  const tableRef = React.useRef<HTMLElement>(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.userPage);

  const [page, setPage] = React.useState(1);
  const loadTotalPage = DataHolder.useTotalPages(data.submissions);
  const totalPage = PageUtils.useTotalPages(loadTotalPage);
  PageUtils.useCorrectPageListener(page, totalPage, setPage);

  const submissions = useSelector(
    DataHolderState.isLoaded(data.submissions)
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : () => undefined
  );

  const load = React.useCallback(() => {
    dispatch(
      fetchSubmissions.request({
        type: 'byUser',
        username,
        pageable: { page, size: PAGE_SIZE },
        target: Target.USER_PAGE,
      })
    );
  }, [dispatch, username, page]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.ProblemPageContents.SUBMISSIONS }));
    };
  }, [load, dispatch]);

  const handlePageChange = React.useCallback(
    (event, { activePage }) => {
      setPage(Number(activePage));
      if (tableRef.current) {
        scrollToElementTop(tableRef.current);
      }
    },
    [setPage]
  );

  useJudgesStream(
    submissions
      ? submissions
          .filter((sub): sub is Submission => sub !== undefined)
          .map((sub) => sub.judge)
      : []
  );

  return (
    <>
      <Header as="h3" content="Lịch sử nộp bài" attached="top" />
      <Segment style={{ minHeight: 364, padding: 0 }} attached>
        <Ref innerRef={tableRef}>
          <UserSubsTable
            loading={DataHolder.isLoading(data.submissions)}
            errorMessage={
              DataHolder.isError(data.submissions)
                ? data.submissions.error.message
                : undefined
            }
            submissions={submissions}
          />
        </Ref>
      </Segment>

      <Segment textAlign="center" attached>
        <Pagination
          activePage={page}
          totalPages={totalPage || 0}
          onPageChange={handlePageChange}
        />
      </Segment>
    </>
  );
};

const UserSubsTable: React.FC<SubmissionsTable.Props> = (props) => {
  const { loading, errorMessage, submissions, ...rest } = props;
  return (
    <Table basic fixed singleLine style={{ border: 'none' }} {...rest}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>ID</Table.HeaderCell>
          <Table.HeaderCell width={3} textAlign="center">
            Bài tập
          </Table.HeaderCell>
          <Table.HeaderCell width={3} textAlign="center">
            Thông tin
          </Table.HeaderCell>
          <Table.HeaderCell width={4} textAlign="center">
            Kết quả
          </Table.HeaderCell>
          <Table.HeaderCell width={4} textAlign="center">
            Tài nguyên
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {loading ? (
        <LoadingTableBody />
      ) : errorMessage ? (
        <ErrorTableBody message={errorMessage} />
      ) : (
        <Table.Body>
          {submissions?.map((submission) => {
            return (
              <SubmissionRow key={submission.id} submission={submission} />
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
};

const SubmissionRow: React.FC<{ submission: Submission }> = (props) => {
  const { submission } = props;

  const judge = useSelector(JudgeSelectors.byId(submission.judge));

  const result = judge?.result;

  return (
    <Table.Row>
      <Table.Cell>
        <SubmissionDetailsLink submission={submission} />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Link to={`/problems/${submission.problem.code}`}>
          {submission.problem.code}
        </Link>
      </Table.Cell>
      <Table.Cell textAlign="center">
        {submission.language.title}
        <br />
        {DateTimeUtils.of(submission.submittedAt).fromNow()}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {judge && <JudgeStatusLabel judgeId={judge.id} />}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {formatResourceTime(result?.resource?.time)} /{' '}
        {formatResourceMemory(result?.resource?.memory)}
      </Table.Cell>
    </Table.Row>
  );
};
