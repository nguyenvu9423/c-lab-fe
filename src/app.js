import React from 'react';
import { Route, Switch } from 'react-router';
import { RegisterPage } from './page/register';
import './style/all.styl';
import { LoginPage } from './page/login';
import { UserPage } from './page/users';
import { toastGroup } from './page/common/ToastGroup';
import TopNav from './page/common/TopNav';
import { ArticlePage } from './page/articles';
import { LogoutPage } from './page/logout';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopNav />
        <div className={'content'} style={{ marginTop: '7em' }}>
          <Switch>
            <Route path={'/register'} component={RegisterPage} />
            <Route path={'/login'} component={LoginPage} />
            <Route path={'/users/:username'} component={UserPage} />
            <Route path={'/articles'} component={ArticlePage} />
            <Route path={'/logout'} component={LogoutPage} />
          </Switch>
        </div>
        {toastGroup}
      </React.Fragment>
    );
  }
}

export default App;
