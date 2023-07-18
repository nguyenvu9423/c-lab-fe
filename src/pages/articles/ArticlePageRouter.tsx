import * as React from 'react';
import { Routes, Route } from 'react-router';
import { ArticlePage } from './ArticlePage';
import { AddArticlePage } from './AddArticlePage';
import { EditArticlePage } from './EditArticlePage';
import { ArticlesPage } from './ArticlesPage';

export const ArticlePageRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="add" element={<AddArticlePage />} />
      <Route path=":id/edit" element={<EditArticlePage />} />
      <Route path=":id/view/*" element={<ArticlePage />} />
      <Route path="/" element={<ArticlesPage />} />
    </Routes>
  );
};
