import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken } from '../store/actions/token';

export function LogoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    history.goBack();
    dispatch(clearToken());
  }, []);
  return <div>You are logged out</div>;
}

// class BaseLogoutPage extends React.Component {
//   constructor() {
//     super();
//     this.componentDidMount = this.componentDidMount.bind(this);
//   }

//   componentDidMount() {
//     const { history, logUserOut } = this.props;
//     AuthProvider.clearToken();
//     logUserOut();
//     history.goBack();
//   }

//   render() {
//     return null;
//   }
// }

// export let LogoutPage = connect(
//   undefined,
//   { logUserOut: logUserOut }
// )(withRouter(BaseLogoutPage));
