import React, { useMemo } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { RichTextView } from '@/components/editors';
import { ContestInfoCard } from './components';
import { BaseContestContentProps } from './shared';

export namespace ContestIntroContent {
  export interface Props extends BaseContestContentProps {}
}

export const ContestIntroContent: React.FC<ContestIntroContent.Props> = (
  props,
) => {
  const { contest, nav } = props;

  const description = useMemo(
    () => JSON.parse(contest.description),
    [contest.description],
  );

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          {nav}
          <Header as="h4" attached="top">
            Giới thiệu
          </Header>
          <Segment attached>
            <div style={{ minHeight: 240 }}>
              <RichTextView contentState={description} />
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <ContestInfoCard contest={contest} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
