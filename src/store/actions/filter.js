import { createActions } from 'redux-actions';

const { applyFilters, resetFilters } = createActions({
  applyFilters: [filters => ({ filters }), (filters, meta) => meta],
  resetFilters: [() => {}, meta => meta]
});

export { applyFilters, resetFilters };
