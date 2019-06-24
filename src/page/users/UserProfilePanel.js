import * as React from 'react';
import {
  Container,
  Grid,
  Header,
  Image,
  Segment,
  Table
} from 'semantic-ui-react';
import moment from 'moment';
import { DateFormat } from '../../constant/DateFormat';
import PropTypes from 'prop-types';

class UserProfilePanel extends React.Component {
  render() {
    const { match, user } = this.props;
    return (
      <Container>
        <Header as={'h2'}>User profile</Header>
        <Segment>
          <Grid columns={2} divided doubling stackable>
            <Grid.Column width={3}>
              <Image
                src={
                  'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                }
                fluid
                bordered
              />
              <Header as={'h3'} style={{ marginTop: 0, paddingTop: 14 }}>
                {user && user.username}
              </Header>
            </Grid.Column>
            <Grid.Column width={13}>
              <Table basic={'very'} celled>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as={'h4'} content={'First name'} />
                    </Table.Cell>
                    <Table.Cell>{user && user.firstName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as={'h4'} content={'Last Name'} />
                    </Table.Cell>
                    <Table.Cell>{user && user.lastName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as={'h4'} content={'Email'} />
                    </Table.Cell>
                    <Table.Cell>{user && user.email}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as={'h4'} content={'Date of Birth'} />
                    </Table.Cell>
                    <Table.Cell>
                      {user &&
                        moment(user.birthDay).format(DateFormat.MediumLength)}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

UserProfilePanel.propTypes = {
  user: PropTypes.object
};

export { UserProfilePanel };
