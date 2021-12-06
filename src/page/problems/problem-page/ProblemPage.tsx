import * as React from 'react';
import { Grid, Container, Divider } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useMatch } from 'react-router';

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
import { useScrollToTop } from '../../../common/hooks';
import { useParams } from 'react-router';
import { UnknownException } from '../../../exception/UnkownException';

export const ProblemPage: React.FC = () => {
  useScrollToTop();
  const { code } = useParams();
  if (!code) {
    throw UnknownException.createDefault();
  }

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
        code,
        target: Target.PROBLEM_PAGE,
      })
    );
  }, [dispatch, code]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.PROBLEM_PAGE }));
    };
  }, [code]);

  const canUpdateProblem = useSelector(
    problem ? AuthorizationSelectors.canUpdateProblem(problem) : () => false
  );

  return (
    <Grid container doubling stackable columns={2}>
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
            <Routes>
              <Route
                path=""
                element={<ProblemMainContent problem={problem} />}
              />
              <Route
                path="submit"
                element={<ProblemSubmitContent problem={problem} />}
              />
              <Route
                path="my"
                element={<PrincipalProblemSubsContent problem={problem} />}
              />
              <Route
                path="status"
                element={<ProblemSubmissionsContent problem={problem} />}
              />
            </Routes>
          </Grid.Row>
        </>
      )}
    </Grid>
  );
};
