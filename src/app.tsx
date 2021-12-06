import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

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
import { AppSideBar, ErrorBoundary, ToastGroup, TopNav } from './components';
import MediaQuery from 'react-responsive';
import { Breakpoint } from './utility';
import { MobileTopNav } from './components/top-nav/MobileTopNav';

const App: React.FC = () => {
  const isInitialized = useSelector(PrincipalSelectors.isInitialized());
  const [sideBarVisible, setSideBarVisible] = React.useState<boolean>(false);
  if (!isInitialized) return null;

  return (
    <ErrorBoundary>
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route
              path="/email-verification"
              element={<EmailVerificationPage />}
            />
            <Route
              path="/reset-password"
              element={<ResetPasswordPageRouter />}
            />

            <Route path="/users/*" element={<UserPageRouter />} />
            <Route path="/articles/*" element={<ArticlePageRouter />} />
            <Route path="/problems/*" element={<ProblemPageRouter />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
          <ToastGroup />
          <Modal />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
