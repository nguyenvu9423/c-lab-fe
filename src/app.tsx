import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

import './style/all.styl';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'katex/dist/katex.min.css';

import {
  RegisterPage,
  UserPageRouter,
  ArticlePageRouter,
  ProblemPageRouter,
  AdminPage,
  HomePage,
  ResetPasswordPageRouter,
  EmailVerificationPage,
  InfoPage,
  ContestPageRouter,
} from './pages';
import { Modal } from './domain-ui/modals';
import { PrincipalSelectors } from './store/selectors';
import { AppSideBar, ErrorBoundary, ToastGroup, TopNav } from './components';
import MediaQuery from 'react-responsive';
import { Breakpoint } from './utils';
import { MobileTopNav } from './components/top-nav/MobileTopNav';
import { LogoutPage } from './pages/logout';
import { AuthorizedPage } from './pages/auth';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div id="root-container">
        <Routes>
          <Route path="/authorized" element={<AuthorizedPage />} />
          <Route path="/*" element={<MainPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

const MainPage: React.FC = () => {
  const isInitialized = useSelector(PrincipalSelectors.isInitialized());
  const [sideBarVisible, setSideBarVisible] = React.useState<boolean>(false);

  if (!isInitialized) {
    return null;
  }
  return (
    <>
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
          <Route path="/contests/*" element={<ContestPageRouter />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/info/*" element={<InfoPage />} />
        </Routes>
      </div>
      <ToastGroup />
      <Modal />
    </>
  );
};
