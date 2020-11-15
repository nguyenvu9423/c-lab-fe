import * as uuid from 'uuid';
import { createActions } from 'redux-actions';
import { defaultCreators, defaultPayloadCreators } from './shared';

const { fetchTags, fetchTag } = createActions({
  fetchTags: {
    request: [
      defaultPayloadCreators,
      (payload, meta) => ({ ...meta, requestId: uuid.v4() })
    ],
    response: defaultCreators
  },
  fetchTag: {
    request: defaultCreators,
    response: defaultCreators
  }
});

export { fetchTag, fetchTags };
