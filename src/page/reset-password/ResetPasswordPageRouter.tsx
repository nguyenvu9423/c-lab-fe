import * as React from 'react';
import { Route, Routes } from 'react-router';
import { ResetPasswordRequestPage } from './ResetPasswordRequestPage';
import { ResetPasswordPage } from './ResetPasswordPage';

export const ResetPasswordPageRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ResetPasswordPage />} />
      <Route path="/request" element={<ResetPasswordRequestPage />} />
    </Routes>
  );
};
