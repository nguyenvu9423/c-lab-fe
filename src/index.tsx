import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import 'semantic-ui-less/semantic.less';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './app';
import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Helmet>
        <title>c-lab</title>
      </Helmet>
      <App />
    </BrowserRouter>
  </Provider>,
);
