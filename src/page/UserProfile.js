import {
  Container,
  Grid,
  Header,
  Image,
  Responsive,
  Segment,
  Table
} from 'semantic-ui-react';
import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DateFormat } from '../constant/DateFormat';

class BaseUserProfile extends React.Component {
  render() {
    const { match, loginUser } = this.props;
    if (loginUser === null) return null;
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
                {loginUser.username}
              </Header>
            </Grid.Column>
            <Grid.Column width={13}>
              <Table basic={'very'} celled>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as={'h4'} content={'First name'} />
                    </Table.Cell>
                    <Table.Cell>{loginUser.firstName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as={'h4'} content={'Last Name'} />
                    </Table.Cell>
                    <Table.Cell>{loginUser.lastName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as={'h4'} content={'Email'} />
                    </Table.Cell>
                    <Table.Cell>{loginUser.email}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Header as={'h4'} content={'Date of Birth'} />
                    </Table.Cell>
                    <Table.Cell>
                      {moment(loginUser.birthDay).format(
                        DateFormat.MediumLength
                      )}
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

export const UserProfile = connect(
  state => {
    return state.login;
  },
  null
)(BaseUserProfile);
