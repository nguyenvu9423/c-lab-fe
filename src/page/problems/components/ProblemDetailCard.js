import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { ProblemSelectors } from '../../../store/selectors/ProblemSelectors';
import { useSelector } from 'react-redux';

export function ProblemDetailCard(props) {
  const { problemId } = props;
  const problem = useSelector(ProblemSelectors.byId(problemId));
  if (!problem) return null;
  return (
    <>
      <Header as="h2" textAlign="center">
        {problem.title}
        <Header.Subheader>
          {problem.timeLimit} ms / {problem.memoryLimit} mb
        </Header.Subheader>
      </Header>
      <div
        className={'article-container'}
        dangerouslySetInnerHTML={{
          __html: problem && problem.definition
        }}
      />
    </>
  );
}
