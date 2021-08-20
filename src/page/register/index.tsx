import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { RegisterForm } from '../../domains/user/forms/RegisterForm';
import { useDispatch } from 'react-redux';
import { addToast } from '../../store/actions';

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSuccess = React.useCallback(() => {
    history.push('/login');
    dispatch(
      addToast({
        header: 'Registered successfully',
        content: 'Your account has been created successfully',
        duration: 2500,
        status: 'positive',
      })
    );
  }, [history]);

  return (
    <Grid container>
      <Grid.Row centered columns={1}>
        <Grid.Column style={{ maxWidth: 560 }}>
          <Header as="h3" attached="top" block>
            Register
          </Header>
          <Segment attached>
            <RegisterForm onSuccess={handleSuccess} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
