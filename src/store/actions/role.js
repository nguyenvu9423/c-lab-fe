import { createActions } from 'redux-actions';
import { defaultCreators } from './shared';

const { fetchRole, fetchRoles } = createActions({
  fetchRole: {
    request: defaultCreators,
    response: defaultCreators
  },
  fetchRoles: {
    request: defaultCreators,
    response: defaultCreators
  }
});

export { fetchRoles, fetchRole };
