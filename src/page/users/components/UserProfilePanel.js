import * as React from 'react';
import { Grid, Header, Image, Segment, Table } from 'semantic-ui-react';
import moment from 'moment';
import { DateFormat } from '../../../constant/DateFormat';
import PropTypes from 'prop-types';

class UserProfilePanel extends React.Component {
  render() {
    const { match, user } = this.props;
    return (
      <Segment>
        <Grid columns={2} divided doubling stackable>
          <Grid.Column width={3}>
            <Image
              src={user && user.avatarLink}
              style={{ width: 128, height: 128 }}
              fluid
              centered
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
    );
  }
}

UserProfilePanel.propTypes = {
  user: PropTypes.object
};

export { UserProfilePanel };
