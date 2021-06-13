import { createAction } from '@reduxjs/toolkit';
import { defaultPrepare } from './shared';

const applyFilters = createAction('applyFilters', (filters, meta) => ({
  payload: {
    filters
  },
  meta
}));

const resetFilters = createAction('resetFilters', defaultPrepare);

export { applyFilters, resetFilters };
