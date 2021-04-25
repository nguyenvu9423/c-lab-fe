import React from 'react';
import './style/all.styl';

import { Route, Switch, Redirect } from 'react-router';
import { RegisterPage } from './page/register';
import { LoginPage } from './page/login';
import { UserPageRouter } from './page/users';
import { toastGroup } from './page/common/ToastGroup';
import { ArticlePageRouter } from './page/articles';
import { LogoutPage } from './page/logout';
import { ProblemPageRouter } from './page/problems';
import { Modal } from './components/modals';
import { AdminPage } from './page/admin';
import { TopNav } from './page/common/TopNav';

class App extends React.Component {
  render() {
    return (
      <>
        <TopNav />
        <div className={'content'} style={{ marginTop: '7em' }}>
          <Switch>
            <Route path="/(.*)/" exact strict>
              {({ match }) => {
                return <Redirect to={match.url.slice(0, -1)} />;
              }}
            </Route>
            <Route path={'/register'} component={RegisterPage} />
            <Route path={'/login'} component={LoginPage} />
            <Route path={'/users'} component={UserPageRouter} />
            <Route path={'/articles'} component={ArticlePageRouter} />
            <Route path={'/logout'} component={LogoutPage} />
            <Route path={'/problems'} component={ProblemPageRouter} />
            <Route path={'/admin'} component={AdminPage} />
          </Switch>
        </div>
        {toastGroup}
        <Modal />
      </>
    );
  }
}

export default App;
