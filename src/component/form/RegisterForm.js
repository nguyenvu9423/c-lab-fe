import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Segment,
  Select
} from 'semantic-ui-react';
import * as React from 'react';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDay: '',
        gender: '',
        workplace: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    let { data } = this.state;
    data[name] = value;
    this.setState({ data });
  }

  handleSubmit() {
    console.log(this.state.data);
  }
  render() {
    let {
      username,
      password,
      firstName,
      lastName,
      birthDay,
      gender,
      workplace
    } = this.state.data;
    return (
      <Grid container>
        <Grid.Row centered columns={1}>
          <Grid.Column style={{ maxWidth: 560 }}>
            <Header as={'h4'} attached={'top'} block>
              Register
            </Header>
            <Segment attached>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>Username</label>
                  <Input
                    placeholder={'Username'}
                    name={'username'}
                    value={username}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <Input
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    value={password}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Group widths={'equal'}>
                  <Form.Field>
                    <label>First name</label>
                    <Input
                      placeholder={'First name'}
                      name={'firstName'}
                      value={firstName}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Last name</label>
                    <Input
                      placeholder={'Last name'}
                      name={'lastName'}
                      value={lastName}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <Form.Field>
                    <label>Birthday</label>
                    <Input
                      placeholder={'Birth day'}
                      type={'date'}
                      name={'birthDay'}
                      value={birthDay}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Gender</label>
                    <Select
                      placeholder={'Gender'}
                      name={'gender'}
                      options={[
                        { text: 'Male', value: 1 },
                        { text: 'Female', value: 2 }
                      ]}
                      value={gender}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <label>Workplace</label>
                  <Input
                    placeholder={'workplace'}
                    name={'workplace'}
                    value={workplace}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Button primary type={'submit'}>
                  Submit
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export { RegisterForm };
