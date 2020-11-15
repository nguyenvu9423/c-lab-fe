import * as React from 'react';
import { Grid, Segment, Container } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';

import { ProblemDetailCard } from './components/ProblemDetailCard';
import { CompactCodeSubmissionForm } from './components/CompactSubmissionForm';
import { ProblemSettingCard } from './components/ProblemSettingCard';
import { fetchProblem } from '../../store/actions/problem';
import { ProblemNavMenu } from './components/ProblemNavMenu';
import { useRouteMatch } from 'react-router-dom';
import { ProblemStatusPage } from './ProblemStatusPage';
import { ProblemSubmitPage } from './ProblemSubmitPage';
import {
  ProblemUserSubmissionCard,
  PAGE_SIZE as CARD_PAGE_SIZE
} from './components/ProblemUserSubmissionCard';
import { UserSelectors } from '../../store/selectors/UserSelectors';
import { TagContainer } from '../../components/tag';
import { ProblemSelectors } from '../../store/selectors';
import { LoadingState } from '../../store/common';
import {
  ErrorMessage,
  LoadingIndicator,
  NotFoundPageMessage
} from '../../components';
import { Target } from '../../store/reducers/target';
import { ProblemUserSubmissionsPage } from './ProblemUserSubmissionsPage';
import { fetchSubmissions } from '../../store/actions';
import { SubmissionFilterCard } from '../../domains/submission';

export function ProblemPage() {
  const { url, params } = useRouteMatch();
  const dispatch = useDispatch();
  const { data } = useSelector(state => state[Target.PROBLEM_DETAILS_PAGE]);
  const problem = useSelector(ProblemSelectors.byId(data.problem.id));
  const loginUser = useSelector(UserSelectors.loginUser());

  const load = React.useCallback(() => {
    dispatch(
      fetchProblem.request(
        { code: params.code },
        {
          target: Target.PROBLEM_DETAILS_PAGE
        }
      )
    );
  }, [params.code]);

  const handleSubmitDone = React.useCallback(
    () =>
      dispatch(
        fetchSubmissions.request(
          {
            userId: loginUser.id,
            problemId: data.problem.id,
            pageable: {
              pageNumber: 0,
              pageSize: CARD_PAGE_SIZE
            }
          },
          { target: Target.PROBLEM_USER_SUBMISSIONS }
        )
      ),
    [loginUser, data.problem.id]
  );

  React.useEffect(() => {
    load();
  }, []);

  if (data.problem.loadingState === LoadingState.ERROR) {
    return (
      <Container>
        <ErrorMessage message={data.problem.error.message} />
      </Container>
    );
  }

  return (
    <Grid container doubling padded="vertically" columns={2}>
      {LoadingState.isInProgress(data.problem.loadingState) ? (
        <Grid.Row>
          <LoadingIndicator />
        </Grid.Row>
      ) : (
        <Grid.Row>
          <Switch>
            <Route path={`${url}`} exact>
              <Grid.Column width={12}>
                <ProblemNavMenu problem={problem} />
                <Segment attached="bottom">
                  <ProblemDetailCard problem={problem} />
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                <Route path={`${url}`} exact>
                  <ProblemSettingCard problem={problem} />
                  <CompactCodeSubmissionForm
                    problem={problem}
                    onSubmitDone={handleSubmitDone}
                  />
                  {loginUser && (
                    <ProblemUserSubmissionCard
                      problem={problem}
                      userId={loginUser.id}
                    />
                  )}
                  <TagContainer problem={problem} />
                </Route>
              </Grid.Column>
            </Route>

            <Route path={`${url}/submit`} exact>
              <Grid.Column width={12}>
                <ProblemNavMenu problem={problem} tabName="submit" />
                <Segment attached="bottom">
                  <ProblemSubmitPage problem={problem} />
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                <TagContainer problemId={problem.id} />
              </Grid.Column>
            </Route>

            <Route path={`${url}/my`} exact>
              <Grid.Column width={12}>
                <ProblemNavMenu problem={problem} tabName="my" />
                <Segment attached="bottom">
                  <ProblemUserSubmissionsPage problem={problem} />
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                <CompactCodeSubmissionForm
                  problem={problem}
                  onSubmitDone={handleSubmitDone}
                />
                <TagContainer problem={problem} />
              </Grid.Column>
            </Route>

            <Route path={`${url}/status`} exact>
              <ProblemStatusContent problem={problem} />
            </Route>

            <Route>
              <Container>
                <NotFoundPageMessage />
              </Container>
            </Route>
          </Switch>
        </Grid.Row>
      )}
    </Grid>
  );
}

function ProblemStatusContent(props) {
  const { problem } = props;
  const [query, setQuery] = React.useState([]);
  return (
    <>
      <Grid.Column width={12}>
        <ProblemNavMenu problem={problem} tabName="status" />
        <Segment attached="bottom">
          <ProblemStatusPage problem={problem} query={query} />
        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>
        <SubmissionFilterCard problem={problem} onQueryChange={setQuery} />
        <TagContainer problem={problem} />
      </Grid.Column>
    </>
  );
}
