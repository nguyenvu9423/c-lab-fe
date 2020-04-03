import * as React from 'react';
import {
  Grid,
  Segment,
  Container,
  Loader,
  Dimmer,
  Message
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';

import { ProblemDetailCard } from './components/ProblemDetailCard';
import { CompactCodeSubmissionForm } from './components/CompactSubmissionForm';
import { ProblemSettingCard } from './components/ProblemSettingCard';
import { ProblemSelectors } from '../../store/selectors/ProblemSelectors';
import { fetchProblemByCode } from '../../store/actions/problem';
import { ProblemNavMenu } from './components/ProblemNavMenu';
import { useRouteMatch } from 'react-router-dom';
import { ProblemStatusPage } from './ProblemStatusPage';
import { ProblemSubmitPage } from './ProblemSubmitPage';
import { ProblemUserSubmissionCard } from './components/ProblemUserSubmissionCard';
import { UserSelectors } from '../../store/selectors/UserSelectors';
import { SubmissionFilter } from '../../domains/submission/components';
import { TagContainer } from '../../components/tag';
import { ProblemDetailsPageSelectors } from '../../store/selectors';
import { LoadingState } from '../../store/common';
import {
  ErrorMessage,
  LoadingIndicator,
  NotFoundPageMessage
} from '../../components';
import { Target } from '../../store/reducers/targets';
import { ProblemUserSubmissionsPage } from './ProblemUserSubmissionsPage';
import { resetState } from '../../store/actions/state';

export function ProblemDetailsPage() {
  const { url, params } = useRouteMatch();
  const dispatch = useDispatch();
  const problem = useSelector(ProblemDetailsPageSelectors.problem());
  const loginUser = useSelector(UserSelectors.loginUser());
  React.useEffect(() => {
    dispatch(
      fetchProblemByCode.request(params.code, {
        target: Target.PROBLEM_DETAILS_PAGE
      })
    );
    return () => {
      dispatch(resetState({ target: Target.PROBLEM_DETAILS_PAGE }));
    };
  }, []);

  if (LoadingState.isInProgress(problem.loadingState)) {
    return <LoadingIndicator />;
  }
  if (problem.loadingState === LoadingState.ERROR) {
    return (
      <Container>
        <ErrorMessage message={problem.error.message} />
      </Container>
    );
  }
  return (
    <Grid container doubling padded="vertically" columns={2}>
      <Grid.Row>
        <Switch>
          <Route path={`${url}`} exact>
            <Grid.Column width={12}>
              <ProblemNavMenu baseUrl={url} />
              <Segment attached="bottom">
                <ProblemDetailCard problemId={problem.id} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Route path={`${url}`} exact>
                <ProblemSettingCard problemId={problem.id} />
                <CompactCodeSubmissionForm problemId={problem.id} />
                {loginUser && (
                  <ProblemUserSubmissionCard
                    problemId={problem.id}
                    userId={loginUser.id}
                  />
                )}
                <TagContainer problemId={problem.id} />
              </Route>
            </Grid.Column>
          </Route>

          <Route path={`${url}/submit`} exact>
            <Grid.Column width={12}>
              <ProblemNavMenu baseUrl={url} tabName="submit" />
              <Segment attached="bottom">
                <ProblemSubmitPage problemId={problem.id} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <TagContainer problemId={problem.id} />
            </Grid.Column>
          </Route>

          <Route path={`${url}/my`} exact>
            <Grid.Column width={12}>
              <ProblemNavMenu baseUrl={url} tabName="my" />
              <Segment attached="bottom">
                <ProblemUserSubmissionsPage problemId={problem.id} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <CompactCodeSubmissionForm problemId={problem.id} />
              <TagContainer problemId={problem.id} />
            </Grid.Column>
          </Route>

          <Route path={`${url}/status`} exact>
            <Grid.Column width={12}>
              <ProblemNavMenu baseUrl={url} tabName="status" />
              <Segment attached="bottom">
                <ProblemStatusPage problemId={problem.id} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <SubmissionFilter problemId={problem.id} />
              <TagContainer problemId={problem.id} />
            </Grid.Column>
          </Route>

          <Route>
            <Container>
              <NotFoundPageMessage />
            </Container>
          </Route>
        </Switch>
      </Grid.Row>
    </Grid>
  );
}
