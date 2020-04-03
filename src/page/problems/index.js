import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProblemOverviewPage } from './ProblemOverviewPage';
import { ProblemDetailsPage } from './ProblemDetailsPage';
import { AddProblemPage } from './AddProblemPage';
import { ProblemEditPage } from './EditProblemPage';
import { useRouteMatch } from 'react-router';

export function ProblemPage() {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/:id/edit`} exact component={ProblemEditPage} />
      <Route path={`${url}/add`} exact component={AddProblemPage} />
      <Route path={`${url}/:code`} component={ProblemDetailsPage} />
      <Route path={`${url}`} exact component={ProblemOverviewPage} />
    </Switch>
  );
}
