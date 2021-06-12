import * as React from 'react';
import { Link } from 'react-router-dom';

import { Table, Segment, Grid, Icon } from 'semantic-ui-react';
import { fetchProblems } from '../../store/actions/problem';
import { useDispatch, useSelector } from 'react-redux';
import { ProblemSelectors, PrincipalSelectors } from '../../store/selectors';
import { LoadingState } from '../../store/common';
import { LoadingIndicator } from '../../components/loading-indicator';
import { TagFilterCard, Pagination } from '../../components';
import { Target } from '../../store/reducers/target';
import { resetState } from '../../store/actions/state';

const PROBLEMS_PAGE_SIZE = 16;

export function ProblemsPage(props) {
  const {
    match: { url }
  } = props;

  const principal = useSelector(PrincipalSelectors.principal());

  const { data } = useSelector(state => state.problemsPage);

  const dispatch = useDispatch();

  const load = React.useCallback(
    ({ pageable, query } = {}) => {
      dispatch(
        fetchProblems.request(
          {
            pageable: pageable ?? data.problems.pageable,
            query: query ?? data.problems.query
          },
          { target: Target.PROBLEMS_PAGE }
        )
      );
    },
    [data]
  );

  const problems = useSelector(ProblemSelectors.byIds(data.problems.ids));

  const handlePageChange = React.useCallback(
    (event, { activePage }) => {
      load({ pageable: { page: activePage - 1, size: PROBLEMS_PAGE_SIZE } });
    },
    [load]
  );

  const handleFilterChange = React.useCallback(tags => {
    const query =
      tags.length > 0 ? `tags=include=(${tags.map(tag => tag.name)})` : '';
    load({ query });
  });

  React.useEffect(() => {
    console.log(principal?.id);
    load({ pageable: { size: PROBLEMS_PAGE_SIZE, page: 0 } });
    return () => dispatch(resetState({ target: Target.PROBLEMS_PAGE }));
  }, [principal?.id]);

  return (
    <Grid container doubling padded="vertically" columns={2}>
      <Grid.Column width={12}>
        <Segment>
          {data.problems.loadingState === LoadingState.LOADING && (
            <LoadingIndicator />
          )}
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
              {problems.map(problem => (
                <Table.Row key={problem.id}>
                  <Table.Cell>
                    <Link to={`${url}/${problem.code}`}>{problem.id}</Link>
                  </Table.Cell>
                  <Table.Cell>{problem.title}</Table.Cell>
                  <Table.Cell>
                    <Link to={`${url}/${problem.code}`}>{problem.code}</Link>
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
        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <TagFilterCard onSubmit={handleFilterChange} />
      </Grid.Column>
    </Grid>
  );
}
