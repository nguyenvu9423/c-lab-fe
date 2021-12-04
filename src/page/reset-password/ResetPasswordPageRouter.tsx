import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ResetPasswordRequestPage } from './ResetPasswordRequestPage';
import { ResetPasswordPage } from './ResetPasswordPage';

export const ResetPasswordPageRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/reset-password" exact component={ResetPasswordPage} />
      <Route
        path="/reset-password/request"
        exact
        component={ResetPasswordRequestPage}
      />
    </Switch>
  );
};
