import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Message,
  Segment,
  Select
} from 'semantic-ui-react';
import * as React from 'react';
import UserService from '../../service/UserService';
import eventEmitter from '../../utility/EventEmitter';
import PropTypes from 'prop-types';
import ArrayUtils from '../../utility/ArrayUtils';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDay: '',
        // gender: '',
        workplace: ''
      },
      fieldErrors: this.getEmptyFieldErrors()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getEmptyFieldErrors() {
    return {
      username: [],
      password: [],
      firstName: [],
      lastName: [],
      email: [],
      birthDay: [],
      // gender: ,
      workplace: []
    };
  }
  componentWillMount() {
    eventEmitter.on('message', response => {
      console.log('Emitted');
    });
  }

  handleChange(e, { name, value }) {
    let { data, fieldErrors } = this.state;
    data[name] = value;
    fieldErrors[name] = [];
    this.setState({ data, fieldErrors });
  }

  handleSubmit() {
    UserService.register(this.state.data)
      .then(response => {
        this.props.onRegisterSuccess();
      })
      .catch(error => {
        console.log(error.response);
        const errorList = error.response.data;
        let fieldErrors = this.getEmptyFieldErrors();
        errorList.forEach(err => {
          fieldErrors[err.field].push(err.defaultMessage);
        });
        this.setState({ fieldErrors });
      });
  }

  render() {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      birthDay,
      workplace
    } = this.state.data;
    const { fieldErrors } = this.state;
    return (
      <Grid container>
        <Grid.Row centered columns={1}>
          <Grid.Column style={{ maxWidth: 560 }}>
            <Header as={'h4'} attached={'top'} block>
              Register
            </Header>
            <Segment attached>
              <Form onSubmit={this.handleSubmit} error={fieldErrors}>
                <Form.Field>
                  <label>Username</label>
                  <Input
                    placeholder={'Username'}
                    name={'username'}
                    value={username}
                    onChange={this.handleChange}
                  />
                  <Message
                    error
                    hidden={ArrayUtils.isEmpty(fieldErrors.username)}
                    list={fieldErrors.username}
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
                  <Message
                    error
                    hidden={ArrayUtils.isEmpty(fieldErrors.password)}
                    list={fieldErrors.password}
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
                    <Message
                      error
                      hidden={ArrayUtils.isEmpty(fieldErrors.firstName)}
                      list={fieldErrors.firstName}
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
                    <Message
                      error
                      hidden={ArrayUtils.isEmpty(fieldErrors.lastName)}
                      list={fieldErrors.lastName}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <label>Email</label>
                  <Input
                    placeholder={'Email'}
                    name={'email'}
                    value={email}
                    onChange={this.handleChange}
                  />
                  <Message
                    error
                    hidden={ArrayUtils.isEmpty(fieldErrors.email)}
                    list={fieldErrors.email}
                  />
                </Form.Field>
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
                    <label>Workplace</label>
                    <Input
                      placeholder={'Workplace'}
                      name={'workplace'}
                      value={workplace}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
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

RegisterForm.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired
};

export { RegisterForm };
