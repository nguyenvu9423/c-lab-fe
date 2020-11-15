import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProblemsPage } from './ProblemsPage';
import { ProblemPage } from './ProblemPage';
import { AddProblemPage } from './AddProblemPage';
import { ProblemEditPage } from './EditProblemPage';
import { useRouteMatch } from 'react-router';

export function ProblemPageRouter() {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/:id/edit`} exact component={ProblemEditPage} />
      <Route path={`${url}/add`} exact component={AddProblemPage} />
      <Route path={`${url}/:code`} component={ProblemPage} />
      <Route path={`${url}`} exact component={ProblemsPage} />
    </Switch>
  );
}
