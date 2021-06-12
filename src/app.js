import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';

import './style/all.styl';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'katex/dist/katex.min.css';

import {
  LoginPage,
  RegisterPage,
  UserPageRouter,
  ArticlePageRouter,
  ProblemPageRouter,
  AdminPage,
  HomePage
} from './page';
import { toastGroup, TopNav } from './page/common';
import { Modal } from './components/modals';
import { PrincipalSelectors } from './store/selectors';

function App() {
  const isInitialized = useSelector(PrincipalSelectors.isInitialized());
  if (!isInitialized) return null;
  return (
    <>
      <TopNav />
      <div className="content" style={{ paddingTop: '7em' }}>
        <Switch>
          <Route path="/(.*)/" exact strict>
            {({ match }) => {
              return <Redirect to={match.url.slice(0, -1)} />;
            }}
          </Route>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/users" component={UserPageRouter} />
          <Route path="/articles" component={ArticlePageRouter} />
          <Route path="/problems" component={ProblemPageRouter} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </div>
      {toastGroup}
      <Modal />
    </>
  );
}

export default App;
