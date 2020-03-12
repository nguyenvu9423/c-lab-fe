import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ProblemOverviewPage } from './ProblemOverviewPage';
import { ProblemDetailsPage } from './ProblemDetailsPage';
import { AddProblemPage } from './AddProblemPage';
import { EditProblemPage } from './EditProblemPage';

function BaseProblemPage(props) {
  const { match } = props;
  return (
    <Switch>
      <Route path={`${match.path}/:id/edit`} component={EditProblemPage} />
      <Route path={`${match.path}/add`} component={AddProblemPage} />
      <Route path={`${match.path}/:code`} component={ProblemDetailsPage} />
      <Route path={`${match.path}`} component={ProblemOverviewPage} />
    </Switch>
  );
}

export const ProblemPage = withRouter(BaseProblemPage);
