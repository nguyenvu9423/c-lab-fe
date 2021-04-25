import * as React from 'react';
import { connect } from 'react-redux';
import { EditUserDetailsForm } from './components/EditUserDetailsForm';
import { UserService } from '../../service/UserService';

class BaseEditUserPage extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, bag) {
    const {
      match: { params },
      user,
      history
    } = this.props;
    UserService.updateUserDetails(user.id, values)
      .then(value => {
        history.goBack();
        bag.setSubmitting(false);
      })
      .catch(error => {
        bag.setSubmitting(false);
      });
  }

  render() {
    const { user } = this.props;
    if (!user) return null;
    return (
      <EditUserDetailsForm initialUser={user} onSubmit={this.handleSubmit} />
    );
  }
}

export const EditUserPage = connect((state, ownProps) => {
  const {
    entities: { user }
  } = state;
  const {
    match: {
      params: { username }
    }
  } = ownProps;
  let targetUser = Object.values(user).find(item => item.username === username);
  return { user: targetUser };
})(BaseEditUserPage);
