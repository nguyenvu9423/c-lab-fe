import * as React from 'react';
import { Grid, Segment, Container, Divider } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router';

import { ProblemDetailCard } from './components/ProblemDetailCard';
import { ProblemInfoCard } from './components/ProblemInfoCard';
import { fetchProblem } from '../../store/actions/problem';
import { ProblemNavMenu } from './components/ProblemNavMenu';
import { useRouteMatch } from 'react-router-dom';
import { ProblemStatusPage } from './ProblemStatusPage';
import { ProblemSubmitPage } from './ProblemSubmitPage';
import {
  ProblemUserSubmissionCard,
  PAGE_SIZE as CARD_PAGE_SIZE,
} from './components/ProblemUserSubmissionCard';
import { TagContainer } from '../../components/tag';
import {
  PrincipalSelectors,
  ProblemEntitySelectors,
} from '../../store/selectors';
import { LoadingState } from '../../store/common';
import {
  ErrorMessage,
  LoadingIndicator,
  NotFoundPageMessage,
} from '../../components';
import { Target } from '../../store/reducers/target';
import { ProblemUserSubmissionsPage } from './ProblemUserSubmissionsPage';
import { fetchSubmissions } from '../../store/actions';
import { SubmissionFilterCard } from '../../domains/submission';
import { SubmissionCard } from './components/SubmissionCard';
import { Problem } from '../../domains/problem';
import { State } from '../../store/state';
import { ProblemSettingPanel } from './components/ProblemSettingPanel';

export const ProblemPage: React.FC = () => {
  const { url, params } = useRouteMatch<{ code: string }>();

  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.problemPage);

  const problem = useSelector(
    data.problem.loadingState === LoadingState.LOADED
      ? ProblemEntitySelectors.selectById(data.problem.id)
      : () => undefined
  );

  const principal = useSelector(PrincipalSelectors.principal());

  const load = React.useCallback(() => {
    dispatch(
      fetchProblem.request({
        type: 'byCode',
        code: params.code,
        target: Target.PROBLEM_DETAILS_PAGE,
      })
    );
  }, [params.code]);

  const handleSubmitDone = React.useCallback(() => {
    if (problem?.id && principal?.id) {
      dispatch(
        fetchSubmissions.request({
          type: 'byUserAndProblem',
          userId: principal.id,
          problemId: problem.id,
          pageable: {
            page: 0,
            size: CARD_PAGE_SIZE,
          },
          target: Target.USER_PROBLEM_SUB_CARD,
        })
      );
    }
  }, [principal, problem?.id]);

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
      {LoadingState.isInProgress(data.problem.loadingState) ||
      problem === undefined ? (
        <Grid.Row>
          <LoadingIndicator />
        </Grid.Row>
      ) : (
        <>
          <Grid.Row>
            <Grid.Column width={16}>
              <ProblemSettingPanel problem={problem} />
              <Divider />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Switch>
              <Route path={`${url}`} exact>
                <Grid.Column width={12}>
                  <ProblemNavMenu problem={problem} />
                  <ProblemDetailCard problem={problem} />
                </Grid.Column>
                <Grid.Column width={4}>
                  <ProblemInfoCard problem={problem} />
                  <SubmissionCard
                    problem={problem}
                    onSuccess={handleSubmitDone}
                  />
                  {principal && (
                    <ProblemUserSubmissionCard
                      problemId={problem.id}
                      userId={principal.id}
                    />
                  )}
                  <TagContainer ids={problem.tags} />
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
                  <TagContainer ids={problem.tags} />
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
                  <SubmissionCard
                    problem={problem}
                    onSuccess={handleSubmitDone}
                  />
                  <TagContainer ids={problem.tags} />
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
        </>
      )}
    </Grid>
  );
};

const ProblemStatusContent: React.FC<{ problem: Problem }> = (props) => {
  const { problem } = props;
  const [query, setQuery] = React.useState<string | undefined>();
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
        <TagContainer ids={problem.tags} />
      </Grid.Column>
    </>
  );
};
