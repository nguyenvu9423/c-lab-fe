import * as React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { TagContainer } from '../../../components';
import { Problem } from '../../../domains/problem';
import { PrincipalSelectors } from '../../../store/selectors';
import {
  ProblemDetailCard,
  ProblemInfoCard,
  PrincipalProblemSubsCard,
  SubmissionCard,
} from '../components';
import { ProblemNavMenu } from '../components/ProblemNavMenu';

export const ProblemMainContent: React.FC<{ problem: Problem }> = (props) => {
  const { problem } = props;
  const principal = useSelector(PrincipalSelectors.principal());
  const subsCardRef = React.useRef<PrincipalProblemSubsCard.Ref | null>(null);

  return (
    <>
      <Grid.Column width={12}>
        <ProblemNavMenu problem={problem} />
        <ProblemDetailCard problem={problem} />
      </Grid.Column>
      <Grid.Column width={4}>
        <ProblemInfoCard problem={problem} />
        <SubmissionCard
          problem={problem}
          onSuccess={() => subsCardRef.current?.reload()}
        />
        {principal && (
          <PrincipalProblemSubsCard
            ref={subsCardRef}
            problemCode={problem.code}
            userId={principal.id}
          />
        )}
        <TagContainer ids={problem.tags} />
      </Grid.Column>
    </>
  );
};
