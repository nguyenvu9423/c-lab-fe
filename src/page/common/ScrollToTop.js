import * as React from 'react';
import { withRouter } from 'react-router';

function BaseScrollToTop({ children, location }) {
  React.useEffect(() => {
    window.scroll(0, 0);
  }, [location]);
  return children || null;
}

export const ScrollToTop = withRouter(BaseScrollToTop);
