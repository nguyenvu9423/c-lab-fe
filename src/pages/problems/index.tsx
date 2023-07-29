import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProblemsPage } from './ProblemsPage';
import { ProblemPage } from './problem-page';
import { AddProblemPage } from './AddProblemPage';
import { ProblemEditPage } from './EditProblemPage';

export const ProblemPageRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="add" element={<AddProblemPage />} />
      <Route path=":code/*" element={<ProblemPage />} />
      <Route path=":code/edit/*" element={<ProblemEditPage />} />
      <Route path="/" element={<ProblemsPage />} />
    </Routes>
  );
};
