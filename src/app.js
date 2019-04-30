import React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import TopNav from './component/TopNav';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import Register from './page/Register';
import { toastGroup } from './component/toast/ToastGroup';
import './style/all.styl';
import LogIn from './page/LogIn';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopNav />
        <div className={'content'} style={{ marginTop: '7em' }}>
          <Switch>
            <Route path={'/register'} component={Register} />
            <Route path={'/login'} component={LogIn} />
          </Switch>
        </div>
        {toastGroup}
      </React.Fragment>
    );
  }
}

export default App;
