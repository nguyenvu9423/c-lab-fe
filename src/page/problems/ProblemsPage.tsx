import * as React from 'react';
import { Link } from 'react-router-dom';

import { Table, Segment, Grid } from 'semantic-ui-react';
import { fetchProblems } from '../../store/actions/problem';
import { useDispatch, useSelector } from 'react-redux';
import { PrincipalSelectors, ProblemSelectors } from '../../store/selectors';
import { LoadingState } from '../../store/common';
import { TagFilterCard, Pagination } from '../../components';
import { Target } from '../../store/reducers/target';
import { resetState } from '../../store/actions/state';
import { State } from '../../store/state';
import { DataHolder } from '../../store/reducers/data-holders/shared';
import { Pageable } from '../../utility';
import { AcceptedLabel } from '../../domains/judge';
import { ErrorTableBody, LoadingTableBody } from '../../components/table';
import { useScrollToTop } from '../../common/hooks';

const PROBLEMS_PAGE_SIZE = 14;
const initialPageable: Pageable = { size: PROBLEMS_PAGE_SIZE, page: 0 };

export const ProblemsPage: React.FC = () => {
  useScrollToTop();

  const principal = useSelector(PrincipalSelectors.principal());
  const { data } = useSelector((state: State) => state.problemsPage);
  const dispatch = useDispatch();

  const pageable = DataHolder.usePageable(data.problems, initialPageable);
  const query = DataHolder.useQuery(data.problems);
  const totalPages = DataHolder.useTotalPages(data.problems);

  const load = React.useCallback(
    (params?: { pageable?: Pageable; query?: string }) => {
      dispatch(
        fetchProblems.request({
          pageable: params?.pageable ?? pageable,
          query: params?.query ?? query,
          target: Target.PROBLEMS_PAGE,
        })
      );
    },
    [dispatch, pageable, query]
  );

  const problems = useSelector(
    data.problems.loadingState === LoadingState.LOADED
      ? ProblemSelectors.byIds(data.problems.result)
      : () => undefined
  );

  const handlePageChange = React.useCallback(
    (event, { activePage }) => {
      load({ pageable: { page: activePage - 1, size: PROBLEMS_PAGE_SIZE } });
    },
    [load]
  );

  const handleFilterChange = React.useCallback(
    (tags) => {
      const query =
        tags.length > 0 ? `tags=include=(${tags.map((tag) => tag.name)})` : '';
      load({ query });
    },
    [load]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.PROBLEMS_PAGE }));
    };
  }, []);

  return (
    <Grid container stackable doubling columns={2}>
      <Grid.Column width={12}>
        <Segment.Group>
          <Segment style={{ minHeight: 634, padding: 0 }}>
            <Table basic fixed singleLine style={{ border: 'none' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={2}>ID</Table.HeaderCell>
                  <Table.HeaderCell width={4}>Mã bài</Table.HeaderCell>
                  <Table.HeaderCell width={6}>Tiêu đề</Table.HeaderCell>
                  {principal && (
                    <Table.HeaderCell width={2}>Đã giải</Table.HeaderCell>
                  )}
                </Table.Row>
              </Table.Header>
              {DataHolder.isLoading(data.problems) && <LoadingTableBody />}
              {DataHolder.isLoaded(data.problems) && problems && (
                <Table.Body>
                  {problems.map((problem) => (
                    <Table.Row key={problem.id}>
                      <Table.Cell>
                        <Link to={problem.code}>{problem.id}</Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={problem.code}>{problem.code}</Link>
                      </Table.Cell>
                      <Table.Cell>{problem.title}</Table.Cell>

                      {principal && (
                        <Table.Cell>
                          {problem.solvedByPrincipal && <AcceptedLabel />}
                        </Table.Cell>
                      )}
                    </Table.Row>
                  ))}
                </Table.Body>
              )}
              {DataHolder.isError(data.problems) && (
                <ErrorTableBody message={data.problems.error.message} />
              )}
            </Table>
          </Segment>
          <Segment textAlign="center">
            <Pagination
              activePage={pageable.page + 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Segment>
        </Segment.Group>
      </Grid.Column>
      <Grid.Column width={4}>
        <TagFilterCard onSubmit={handleFilterChange} />
      </Grid.Column>
    </Grid>
  );
};
