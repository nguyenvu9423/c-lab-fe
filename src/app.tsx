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
  HomePage,
  LogoutPage,
  ResetPasswordPageRouter,
  EmailVerificationPage,
} from './page';
import { Modal } from './components/modals';
import { PrincipalSelectors } from './store/selectors';
import { ToastGroup, TopNav } from './components';
import MediaQuery from 'react-responsive';
import { Breakpoint } from './utility';
import { MobileTopNav } from './components/top-nav/MobileTopNav';
import { AppSideBar } from './components/sidebar';

const App: React.FC = () => {
  const isInitialized = useSelector(PrincipalSelectors.isInitialized());
  const [sideBarVisible, setSideBarVisible] = React.useState<boolean>(false);
  if (!isInitialized) return null;
  return (
    <>
      <AppSideBar
        visible={sideBarVisible}
        onHide={() => setSideBarVisible(false)}
      />
      <div id="root-container">
        <MediaQuery minWidth={Breakpoint.md}>
          {(matched) =>
            matched ? (
              <TopNav />
            ) : (
              <MobileTopNav onSideBarOpen={() => setSideBarVisible(true)} />
            )
          }
        </MediaQuery>

        <div className="content" style={{ paddingTop: '7em' }}>
          <Switch>
            <Route path="/(.*)/" exact strict>
              {({ match }) => {
                return <Redirect to={match?.url.slice(0, -1) ?? '/'} />;
              }}
            </Route>
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/users" component={UserPageRouter} />
            <Route path="/articles" component={ArticlePageRouter} />
            <Route path="/problems" component={ProblemPageRouter} />
            <Route path="/admin" component={AdminPage} />
            <Route
              path="/email-verification"
              component={EmailVerificationPage}
            />
            <Route path="/reset-password" component={ResetPasswordPageRouter} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </div>
      </div>
      <ToastGroup />
      <Modal />
    </>
  );
};

export default App;
