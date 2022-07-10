import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import 'semantic-ui-less/semantic.less';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Helmet>
        <title>c-lab</title>
      </Helmet>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
