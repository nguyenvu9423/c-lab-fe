import React from 'react';
import TopNav from './component/TopNav';
import { Route, Switch } from 'react-router';
import { RegisterPage } from './page/Register';
import { toastGroup } from './component/toast/ToastGroup';
import './style/all.styl';
import { LoginPage } from './page/LogIn';
import { UserProfile } from './page/UserProfile';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopNav />
        <div className={'content'} style={{ marginTop: '7em' }}>
          <Switch>
            <Route path={'/register'} component={RegisterPage} />
            <Route path={'/login'} component={LoginPage} />
            <Route path={'/users/:id'} component={UserProfile} />
          </Switch>
        </div>
        {toastGroup}
      </React.Fragment>
    );
  }
}

export default App;
