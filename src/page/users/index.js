import * as React from 'react';
import { Route, Switch } from 'react-router';
import { UserPage } from './UserPage';
import { EditUserPage } from './EditUserPage';
import { ChangeUserPasswordPage } from './ChangeUserPasswordPage';

class UserPageRouter extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route
          path={`${match.path}/:username/change-password`}
          component={ChangeUserPasswordPage}
        />
        <Route path={`${match.path}/:username/edit`} component={EditUserPage} />
        <Route path={`${match.path}/:username`} component={UserPage} />
      </Switch>
    );
  }
}

export { UserPageRouter };
