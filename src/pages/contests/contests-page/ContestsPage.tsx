import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { useScrollToTop } from '@/shared/hooks';
import { UpcomingContestsSection } from './UpcomingContestsSection';
import { FinishedContestsSection } from './FinishedContestsSection';

export const ContestsPage: React.FC = () => {
  useScrollToTop();

  return (
    <>
      <Helmet>
        <title>Kỳ thi</title>
      </Helmet>
      <Grid container stackable doubling>
        <Grid.Column>
          <UpcomingContestsSection />
          <FinishedContestsSection />
        </Grid.Column>
      </Grid>
    </>
  );
};
