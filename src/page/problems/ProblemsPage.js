import * as React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Table,
  Container,
  Pagination,
  Loader,
  Segment,
  Grid
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchProblems } from '../../store/actions/problem';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ProblemSelectors } from '../../store/selectors';
import { LoadingState } from '../../store/common';
import { LoadingIndicator } from '../../components/loading-indicator';
import { TagFilterCard } from '../../components';
import { Target } from '../../store/reducers/targets';
import { resetState } from '../../store/actions/state';

const PROBLEMS_PAGE_SIZE = 16;

export function ProblemsPage(props) {
  const {
    match: { url }
  } = props;

  const { problems: problemsData } = useSelector(state => state.problemsPage);
  const problems = useSelector(ProblemSelectors.byIds(problemsData.ids));
  const handlePageChange = React.useCallback((event, { activePage }) => {
    dispatch(
      fetchProblems.request({
        pageable: {
          pageSize: PROBLEMS_PAGE_SIZE,
          pageNumber: activePage - 1
        }
      })
    );
  }, []);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (problemsData.loadingState === LoadingState.LOAD_NEEDED) {
      dispatch(
        fetchProblems.request({
          pageable: {
            pageSize: PROBLEMS_PAGE_SIZE,
            pageNumber: problemsData.pageNumber
          },
          filters: problemsData.filters
        })
      );
    }
  }, [problemsData]);

  React.useEffect(() => {
    return () => dispatch(resetState({ target: Target.PROBLEMS_PAGE }));
  }, []);

  return (
    <Grid container doubling padded="vertically" columns={2}>
      <Grid.Column width={12}>
        <Segment>
          {problemsData.loadingState === LoadingState.LOADING && (
            <LoadingIndicator />
          )}
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2}>ID</Table.HeaderCell>
                <Table.HeaderCell width={10}>Tiêu đề</Table.HeaderCell>
                <Table.HeaderCell width={4}>Mã</Table.HeaderCell>
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
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Pagination
                    size={'tiny'}
                    floated="right"
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    boundaryRange={0}
                    activePage={problemsData.pageNumber + 1}
                    totalPages={problemsData.totalPages}
                    onPageChange={handlePageChange}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <TagFilterCard target={Target.PROBLEMS_PAGE} />
      </Grid.Column>
    </Grid>
  );
}
