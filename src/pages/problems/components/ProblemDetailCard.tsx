import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { MarkdownView } from '../../../components';
import { Problem } from '@/domains/problem';

export namespace ProblemDetailCard {
  export interface Props {
    problem: Problem;
  }
}

export const ProblemDetailCard: React.FC<ProblemDetailCard.Props> = (props) => {
  const { problem } = props;
  if (!problem) return null;
  return (
    <Segment className="text-container" padded>
      <Header as="h1" textAlign="center">
        {problem.title}
      </Header>

      <MarkdownView>{problem.definition}</MarkdownView>
    </Segment>
  );
};
