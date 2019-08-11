import * as React from 'react';
import { Route, Switch } from 'react-router';
import { UserDetailPage } from './UserDetailPage';
import { EditUserPage } from './EditUserPage';
import { ChangeUserPasswordPage } from './ChangeUserPasswordPage';

class UserPage extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route
          path={`${match.path}/:username/change-password`}
          component={ChangeUserPasswordPage}
        />
        <Route path={`${match.path}/:username/edit`} component={EditUserPage} />
        <Route path={`${match.path}/:username`} component={UserDetailPage} />
      </Switch>
    );
  }
}

export { UserPage };
