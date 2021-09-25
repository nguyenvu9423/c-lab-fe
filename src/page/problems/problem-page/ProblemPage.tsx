import * as React from 'react';
import { Grid, Container, Divider } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import { useRouteMatch } from 'react-router-dom';

import { fetchProblem } from '../../../store/actions/problem';
import {
  AuthorizationSelectors,
  ProblemSelectors,
} from '../../../store/selectors';
import { LoadingState } from '../../../store/common';
import {
  ErrorMessage,
  LoadingIndicator,
  NotFoundPageMessage,
} from '../../../components';
import { Target } from '../../../store/reducers/target';
import { State } from '../../../store/state';
import { ProblemSettingPanel } from '../components';
import { DataHolderState } from '../../../store/reducers/data-holders/shared';

import { ProblemMainContent } from './ProblemMainContent';
import { ProblemSubmitContent } from './ProblemSubmitContent';
import { PrincipalProblemSubsContent } from './PrincipalProblemSubsContent';
import { ProblemSubmissionsContent } from './ProblemSubmissionsContent';
import { resetState } from '../../../store/actions';

export const ProblemPage: React.FC = () => {
  const { url, params } = useRouteMatch<{ code: string }>();

  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.problemPage);

  const problem = useSelector(
    data.problem.loadingState === LoadingState.LOADED
      ? ProblemSelectors.byId(data.problem.id)
      : () => undefined
  );

  const load = React.useCallback(() => {
    dispatch(
      fetchProblem.request({
        type: 'byCode',
        code: params.code,
        target: Target.PROBLEM_PAGE,
      })
    );
  }, [dispatch, params.code]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.PROBLEM_PAGE }));
    };
  }, [params.code]);

  const canUpdateProblem = useSelector(
    problem ? AuthorizationSelectors.canUpdateProblem(problem) : () => false
  );

  return (
    <Grid container doubling padded="vertically" columns={2}>
      {DataHolderState.isError(data.problem) && (
        <Container>
          <ErrorMessage message={data.problem.error.message} />
        </Container>
      )}
      {DataHolderState.isLoading(data.problem) && (
        <Grid.Row>
          <LoadingIndicator />
        </Grid.Row>
      )}
      {DataHolderState.isLoaded(data.problem) && problem && (
        <>
          {canUpdateProblem && (
            <Grid.Row>
              <Grid.Column width={16}>
                <ProblemSettingPanel problem={problem} />
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Switch>
              <Route path={`${url}`} exact>
                <ProblemMainContent problem={problem} />
              </Route>
              <Route path={`${url}/submit`} exact>
                <ProblemSubmitContent problem={problem} />
              </Route>
              <Route path={`${url}/my`} exact>
                <PrincipalProblemSubsContent problem={problem} />
              </Route>
              <Route path={`${url}/status`} exact>
                <ProblemSubmissionsContent problem={problem} />
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
