export const FilterConverter = {
  toString: filters => {
    return filters
      .map(filter => `${filter.key}${filter.operator}${filter.value}`)
      .join(',');
  }
};
