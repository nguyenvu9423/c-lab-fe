import * as React from 'react';
import { useMatch, useNavigate } from 'react-router';
import { Grid, Menu } from 'semantic-ui-react';
import { IntroContent } from './contents/IntroContent';
import { GuideContent } from './contents/GuideContent';

export const InfoPage: React.FC = () => {
  const match = useMatch('/info/:activeItem');
  const activeItem = match?.params.activeItem ?? 'intro';
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid.Column width={4}>
        <Menu pointing vertical fluid>
          <Menu.Item
            content="Giới thiệu"
            active={activeItem === 'intro'}
            onClick={() => navigate('intro')}
          />
          <Menu.Item
            content="Hướng dẫn"
            active={activeItem === 'guide'}
            onClick={() => navigate('guide')}
          />
        </Menu>
      </Grid.Column>
      <Grid.Column width={12}>
        {activeItem === 'intro' ? <IntroContent /> : <GuideContent />}
      </Grid.Column>
    </Grid>
  );
};
