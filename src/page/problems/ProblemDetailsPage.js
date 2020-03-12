import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ProblemDetailCard } from './components/ProblemDetailCard';
import { CompactCodeSubmissionForm } from './components/CompactSubmissionForm';
import { ProblemSettingCard } from './components/ProblemSettingCard';
import { ProblemSelectors } from '../../store/selectors/ProblemSelectors';
import { useDispatch } from 'react-redux';
import { fetchProblem } from '../../store/actions/problem';
import { ProblemNavMenu } from './components/ProblemNavMenu';
import { useRouteMatch } from 'react-router-dom';
import { ProblemStatusPage } from './ProblemStatusPage';
import { ProblemSubmitPage } from './ProblemSubmitPage';
import { UserSubmissionToProblemCard } from './components/UserSubmissionToProblemCard';
import { UserSelectors } from '../../store/selectors/UserSelectors';
import { SubmissionFilter } from '../../domains/submission/components';
import { TagContainer } from '../../components/tag';

export function ProblemDetailsPage(props) {
  const {
    match: { url, params }
  } = props;
  const dispatch = useDispatch();
  const {
    params: { tabName }
  } = useRouteMatch(`${url}/:tabName?`);
  const problem = useSelector(ProblemSelectors.byCode(params.code));
  const loginUser = useSelector(UserSelectors.loginUser());
  React.useEffect(() => {
    dispatch(fetchProblem.request({ code: params.code }));
  }, []);

  if (!problem) return null;
  return (
    <Grid container doubling padded="vertically" columns={2}>
      <Grid.Row>
        <Grid.Column width={12}>
          <ProblemNavMenu rootUrl={url} tabName={tabName} />
          <Segment attached="bottom">
            {tabName == undefined && (
              <ProblemDetailCard problemId={problem.id} />
            )}
            {tabName == 'status' && (
              <ProblemStatusPage problemId={problem.id} />
            )}
            {tabName == 'submit' && (
              <ProblemSubmitPage problemId={problem.id} />
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          {tabName === undefined && (
            <ProblemSettingCard problemId={problem.id} />
          )}
          {tabName === undefined && (
            <CompactCodeSubmissionForm problemId={problem.id} />
          )}
          {loginUser && tabName === undefined && (
            <UserSubmissionToProblemCard
              problemId={problem.id}
              userId={loginUser.id}
            />
          )}
          {tabName === 'status' && <SubmissionFilter problemId={problem.id} />}
          <TagContainer problemId={problem.id} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
