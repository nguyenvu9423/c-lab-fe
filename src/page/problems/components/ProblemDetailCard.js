import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { MarkdownView } from '../../../components';

export function ProblemDetailCard(props) {
  const { problem } = props;
  if (!problem) return null;
  return (
    <>
      <Header as="h2" textAlign="center">
        {problem.title}
        <Header.Subheader>
          {problem.timeLimit} ms / {problem.memoryLimit} mb
        </Header.Subheader>
      </Header>

      <div className={'article-container'}>
        <MarkdownView>{problem.definition}</MarkdownView>
      </div>
    </>
  );
}
