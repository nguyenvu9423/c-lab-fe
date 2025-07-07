import React from 'react';
import { Route, Routes } from 'react-router';
import { ContestsPage } from './contests-page';
import { AddContestPage } from './AddContestPage';
import { ContestPage } from './ContestPage';
import { EditContestPage } from './EditContestPage';

export const ContestPageRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ContestsPage />} />
      <Route path="add" element={<AddContestPage />} />
      <Route path=":id/*" element={<ContestPage />} />
      <Route path=":id/edit/*" element={<EditContestPage />} />
    </Routes>
  );
};
