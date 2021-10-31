import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Table } from 'semantic-ui-react';
import { Pagination } from '../../../../components';
import { LoadingTableBody } from '../../../../components/table/LoadingTableBody';
import { useJudgesStream } from '../../../../domains/judge';
import { Submission } from '../../../../domains/submission';
import { QualifySubButton } from '../../../../domains/submission/components/buttons';
import { RejudgeSubButton } from '../../../../domains/submission/components/buttons/RejudgeSubButton';
import { SubmissionStatusLabel } from '../../../../domains/submission/components/SubmissionStatusLabel';
import { State } from '../../../../store';
import { fetchSubmissions, resetState } from '../../../../store/actions';
import { DataHolder } from '../../../../store/reducers/data-holders/shared';
import { Target } from '../../../../store/reducers/target';
import {
  ConstSelectors,
  SubmissionSelectors,
} from '../../../../store/selectors';
import { Pageable } from '../../../../utility';
import { SubmissionFilter } from './SubmissionFilter';

const PAGE_SIZE = 10;
const initialPageable: Pageable = {
  page: 0,
  size: PAGE_SIZE,
};

export const SubmissionPage: React.FC = () => {
  const { data } = useSelector((state: State) => state.adminPage.submission);
  const submissions = useSelector(
    DataHolder.isLoaded(data.submissions)
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : ConstSelectors.value(undefined)
  );

  const pageable: Pageable = DataHolder.isLoadRequested(data.submissions)
    ? data.submissions.pageable
    : initialPageable;

  const query = DataHolder.useQuery(data.submissions);
  const totalPages = DataHolder.useTotalPages(data.submissions);
  const dispatch = useDispatch();

  const load = React.useCallback(
    (params?: { pageable?: Pageable; query?: string }) => {
      dispatch(
        fetchSubmissions.request({
          type: 'byQuery',
          pageable: params?.pageable ?? pageable,
          query: params?.query ?? query,
          target: Target.AdminPage.SUBMISSION,
        })
      );
    },
    [dispatch, pageable, query]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.SUBMISSION }));
    };
  }, []);

  useJudgesStream(
    submissions
      ? submissions
          .filter((sub): sub is Submission => sub !== undefined)
          .map((sub) => sub.judge)
      : []
  );

  return (
    <Segment clearing>
      <Segment vertical>
        <SubmissionFilter onChange={(query) => load({ query })} />
      </Segment>
      <Segment vertical className="table-container" style={{ minHeight: 651 }}>
        <Table basic="very" fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>ID</Table.HeaderCell>
              <Table.HeaderCell width={3}>Bài</Table.HeaderCell>
              <Table.HeaderCell width={4}>Người nộp</Table.HeaderCell>
              <Table.HeaderCell width={4}>Kết quả</Table.HeaderCell>
              <Table.HeaderCell width={3} />
            </Table.Row>
          </Table.Header>
          {DataHolder.isLoading(data.submissions) && <LoadingTableBody />}
          {DataHolder.isLoaded(data.submissions) && submissions && (
            <Table.Body>
              {submissions.map((submission) => (
                <Table.Row key={submission.id}>
                  <Table.Cell>{submission.id}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/problems/${submission.problem.code}`}>
                      {submission.problem.code}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/users/${submission.user.username}`}>
                      {submission.user.username}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <SubmissionStatusLabel submission={submission} />
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <RejudgeSubButton submission={submission} />
                    <QualifySubButton submission={submission} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table>
      </Segment>
      <Segment vertical>
        <Pagination
          activePage={pageable.page + 1}
          totalPages={totalPages}
          floated="right"
          onPageChange={(event, { activePage }) => {
            load({
              pageable: { page: Number(activePage) - 1, size: PAGE_SIZE },
            });
          }}
        />
      </Segment>
    </Segment>
  );
};
