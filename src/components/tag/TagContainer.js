import * as React from 'react';
import { Header, Segment, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ProblemSelectors } from '../../store/selectors/ProblemSelectors';

export const TagContainer = props => {
  const { problemId } = props;
  const problem = useSelector(ProblemSelectors.byId(problemId));
  if (!problem) return null;
  return (
    <>
      <Header as="h3" attached="top">
        Tags
      </Header>
      <Segment attached="bottom">
        {problem.tags.map(tag => (
          <Label tag key={tag.id}>
            {tag.name}
          </Label>
        ))}
      </Segment>
    </>
  );
};
