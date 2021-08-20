import * as React from 'react';
import { match, Route, Switch } from 'react-router';
import { UserPage } from './UserPage';
import { EditUserPage } from './EditUserPage';
import { EditUserPasswordPage } from './EditUserPasswordPage';

export const UserPageRouter: React.FC<{ match: match }> = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route
        path={`${match.path}/:username/change-password`}
        component={EditUserPasswordPage}
      />
      <Route path={`${match.path}/:username/edit`} component={EditUserPage} />
      <Route path={`${match.path}/:username`} component={UserPage} />
    </Switch>
  );
};
