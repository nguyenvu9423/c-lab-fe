import * as React from 'react';
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Input,
  Message,
  Segment
} from 'semantic-ui-react';
import UserService from '../../service/UserService';
import ArrayUtils from '../../utility/ArrayUtils';

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: ''
      },
      fieldErrors: this.getEmptyFieldErrors()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getEmptyFieldErrors() {
    return {
      username: [],
      password: []
    };
  }
  handleChange(e, { name, value }) {
    let { data, fieldErrors } = this.state;
    data[name] = value;
    fieldErrors[name] = [];
    this.setState({ data, fieldErrors });
  }

  handleSubmit() {
    UserService.login(this.state.data)
      .then(response => {
        console.log('Success');
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
    const { username, password, fieldErrors } = this.state;
    return (
      <Grid container>
        <Grid.Row centered column={1}>
          <Grid.Column style={{ maxWidth: 480 }}>
            <Header as={'h4'} attached={'top'} block>
              Login
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
                <div className={'clear-fix-container'}>
                  <Checkbox label={'Remember me'} />
                  <Button primary type={'submit'} floated={'right'}>
                    Submit
                  </Button>
                </div>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default LogInForm;
