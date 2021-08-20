import * as React from 'react';
import { Link, RouteChildrenProps } from 'react-router-dom';

import { Table, Segment, Grid, Icon } from 'semantic-ui-react';
import { fetchProblems } from '../../store/actions/problem';
import { useDispatch, useSelector } from 'react-redux';
import {
  PrincipalSelectors,
  ProblemEntitySelectors,
} from '../../store/selectors';
import { LoadingState } from '../../store/common';
import { LoadingIndicator } from '../../components/loading-indicator';
import { TagFilterCard, Pagination } from '../../components';
import { Target } from '../../store/reducers/target';
import { resetState } from '../../store/actions/state';
import { State } from '../../store/state';
import { DataHolderState } from '../../store/reducers/data-holders/shared';
import { Pageable } from '../../utility';

const PROBLEMS_PAGE_SIZE = 16;
const initialPageable: Pageable = { size: PROBLEMS_PAGE_SIZE, page: 0 };

export const ProblemsPage: React.FC<RouteChildrenProps> = () => {
  const principal = useSelector(PrincipalSelectors.principal());
  const { data } = useSelector((state: State) => state.problemsPage);
  const dispatch = useDispatch();

  const current = DataHolderState.isLoadRequested(data.problems)
    ? { pageable: data.problems.pageable, query: data.problems.query }
    : { pageable: initialPageable };

  const load = React.useCallback(
    ({ pageable, query } = {}) => {
      dispatch(
        fetchProblems.request({
          pageable: pageable ?? current?.pageable,
          query: query ?? current?.query,
          target: Target.PROBLEMS_PAGE,
        })
      );
    },
    [dispatch, current?.pageable, current?.query]
  );

  const problems = useSelector(
    data.problems.loadingState === LoadingState.LOADED
      ? ProblemEntitySelectors.selectByIds(data.problems.result)
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
    <Grid container doubling padded="vertically" columns={2}>
      <Grid.Column width={12}>
        <Segment>
          {data.problems.loadingState === LoadingState.LOADING && (
            <LoadingIndicator />
          )}
          {data.problems.loadingState === LoadingState.LOADED && (
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={2}>ID</Table.HeaderCell>
                  <Table.HeaderCell width={6}>Tiêu đề</Table.HeaderCell>
                  <Table.HeaderCell width={6}>Mã</Table.HeaderCell>
                  {principal && (
                    <Table.HeaderCell width={2}>Solved</Table.HeaderCell>
                  )}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {problems?.map((problem) => (
                  <Table.Row key={problem.id}>
                    <Table.Cell>
                      <Link to={`problems/${problem.code}`}>{problem.id}</Link>
                    </Table.Cell>
                    <Table.Cell>{problem.title}</Table.Cell>
                    <Table.Cell>
                      <Link to={`problems/${problem.code}`}>
                        {problem.code}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {principal && problem.solvedByPrincipal && (
                        <Icon name="check" color="green" />
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <Pagination
                      floated="right"
                      activePage={data.problems.pageable.page + 1}
                      totalPages={data.problems.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          )}
        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <TagFilterCard onSubmit={handleFilterChange} />
      </Grid.Column>
    </Grid>
  );
};
