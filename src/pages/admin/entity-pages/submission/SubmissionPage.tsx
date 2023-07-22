import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Table } from 'semantic-ui-react';
import { Pagination } from '@/components';
import { LoadingTableBody } from '@/components/table';
import { useJudgesStream } from '@/domain-ui/judge';
import { Submission } from '@/domains/submission';
import {
  QualifySubButton,
  RejudgeSubButton,
  SubmissionDetailsLink,
  SubmissionStatusLabel,
} from '@/domain-ui/submission';
import { State } from '@/store';
import { fetchSubmissions, resetState } from '@/store/actions';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { Target } from '@/store/reducers/target';
import { ConstSelectors, SubmissionSelectors } from '@/store/selectors';
import { SubmissionFilter } from './SubmissionFilter';
import { PageUtils } from '../../../shared';

const PAGE_SIZE = 10;

export const SubmissionPage: React.FC = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state: State) => state.adminPage.submission);
  const submissions = useSelector(
    DataHolder.isLoaded(data.submissions)
      ? SubmissionSelectors.byIds(data.submissions.ids)
      : ConstSelectors.value(undefined)
  );

  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState<string | undefined>(undefined);

  const loadTotalPages = DataHolder.useTotalPages(data.submissions);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);
  PageUtils.useCorrectPageListener(page, totalPages, setPage);

  const load = React.useCallback(() => {
    dispatch(
      fetchSubmissions.request({
        type: 'byQuery',
        pageable: { page, size: PAGE_SIZE },
        query: query,
        target: Target.AdminPage.SUBMISSION,
      })
    );
  }, [dispatch, page, query]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.AdminPage.SUBMISSION }));
    };
  }, [load, dispatch]);

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
        <SubmissionFilter onChange={setQuery} />
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
                  <Table.Cell>
                    <SubmissionDetailsLink submission={submission}>
                      {submission.id}
                    </SubmissionDetailsLink>
                  </Table.Cell>
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
          activePage={page}
          totalPages={totalPages || 0}
          floated="right"
          onPageChange={(event, { activePage }) => setPage(Number(activePage))}
        />
      </Segment>
    </Segment>
  );
};
