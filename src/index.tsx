import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'semantic-ui-less/semantic.less';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app';
import { store } from './store';
import history from './history';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
