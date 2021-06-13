import { createAction } from '@reduxjs/toolkit';

const search = {
  request: createAction('search/request', (searchString) => ({
    payload: { searchString },
  })),
  response: createAction('search/response'),
};

export { search };
