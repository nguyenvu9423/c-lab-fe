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
  InfoPage,
} from './pages';
import { Modal } from './domain-ui/modals';
import { PrincipalSelectors } from './store/selectors';
import { AppSideBar, ErrorBoundary, ToastGroup, TopNav } from './components';
import MediaQuery from 'react-responsive';
import { Breakpoint } from './utils';
import { MobileTopNav } from './components/top-nav/MobileTopNav';

const App: React.FC = () => {
  const isInitialized = useSelector(PrincipalSelectors.isInitialized());
  const [sideBarVisible, setSideBarVisible] = React.useState<boolean>(false);
  if (!isInitialized) return null;

  return (
    <ErrorBoundary>
      <div id="root-container">
        <AppSideBar
          visible={sideBarVisible}
          onHide={() => setSideBarVisible(false)}
        />
        <MediaQuery
          minWidth={Breakpoint.md}
          onChange={(matched) => {
            if (matched) setSideBarVisible(false);
          }}
        >
          {(matched) =>
            matched ? (
              <TopNav />
            ) : (
              <MobileTopNav onSideBarOpen={() => setSideBarVisible(true)} />
            )
          }
        </MediaQuery>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route
              path="/email-verification/:id"
              element={<EmailVerificationPage />}
            />
            <Route
              path="/reset-password/*"
              element={<ResetPasswordPageRouter />}
            />

            <Route path="/users/*" element={<UserPageRouter />} />
            <Route path="/articles/*" element={<ArticlePageRouter />} />
            <Route path="/problems/*" element={<ProblemPageRouter />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/info/*" element={<InfoPage />} />
          </Routes>
        </div>
        <ToastGroup />
        <Modal />
      </div>
    </ErrorBoundary>
  );
};

export default App;
