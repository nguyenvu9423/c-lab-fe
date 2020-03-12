import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchProblems } from '../../store/actions/problem';
import { connect } from 'react-redux';

function BaseProblemOverviewPage(props) {
  const { problems, fetchProblems } = props;
  React.useEffect(() => {
    fetchProblems();
  }, []);
  return (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Mã</Table.HeaderCell>
            <Table.HeaderCell width={12}>Tiêu đề</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {problems.map(problem => (
            <Table.Row key={problem.id}>
              <Table.Cell>
                <Link to={`problems/${problem.code}`}>{problem.code}</Link>
              </Table.Cell>
              <Table.Cell>{problem.title}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}

export const ProblemOverviewPage = connect(
  state => {
    const {
      entities,
      problemOverview: { problems }
    } = state;
    return {
      problems: problems
        ? problems.map(problemId => entities.problem[problemId])
        : []
    };
  },
  { fetchProblems: fetchProblems.request }
)(withRouter(BaseProblemOverviewPage));
