import * as React from 'react';
import { Route, Routes } from 'react-router';
import { UserPage } from './UserPage';
import { EditUserInfoPage } from './EditUserInfoPage';
import { EditUserPasswordPage } from './EditUserPasswordPage';

export const UserPageRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        path=":username/change-password"
        element={<EditUserPasswordPage />}
      />
      <Route path=":username/edit/*" element={<EditUserInfoPage />} />
      <Route path=":username" element={<UserPage />} />
    </Routes>
  );
};
