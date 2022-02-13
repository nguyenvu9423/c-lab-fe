import * as React from 'react';
import { useMatch, useNavigate } from 'react-router';
import { Grid, Menu } from 'semantic-ui-react';
import { IntroContent } from './contents/IntroContent';
import { GuideContent } from './contents/GuideContent';

export const IntroPage: React.FC = () => {
  const match = useMatch('/intro/:activeItem');
  const activeItem = match?.params.activeItem ?? 'home';
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid.Column width={4}>
        <Menu pointing vertical fluid>
          <Menu.Item
            content="Giới thiệu"
            active={activeItem === 'home'}
            onClick={() => navigate('home')}
          />
          <Menu.Item
            content="Hướng dẫn"
            active={activeItem === 'guide'}
            onClick={() => navigate('guide')}
          />
        </Menu>
      </Grid.Column>
      <Grid.Column width={12}>
        {activeItem === 'home' ? <IntroContent /> : <GuideContent />}
      </Grid.Column>
    </Grid>
  );
};
