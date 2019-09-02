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
import { ScrollToTop } from './page/common/ScrollToTop';

class App extends React.Component {
  render() {
    return (
      <ScrollToTop>
        <TopNav />
        <div className={'content'} style={{ marginTop: '7em' }}>
          <Switch>
            <Route path={'/register'} component={RegisterPage} />
            <Route path={'/login'} component={LoginPage} />
            <Route path={'/users'} component={UserPage} />
            <Route path={'/articles'} component={ArticlePage} />
            <Route path={'/logout'} component={LogoutPage} />
          </Switch>
        </div>
        {toastGroup}
      </ScrollToTop>
    );
  }
}

export default App;
