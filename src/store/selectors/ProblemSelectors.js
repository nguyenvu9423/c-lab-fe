export const ProblemSelectors = {
  byId(id) {
    return state => {
      return id ? state.entities.problem[id] : undefined;
    };
  },
  byIds(ids) {
    return state => ids.map(id => state.entities.problem[id]);
  },
  byCode(code) {
    return state => {
      return Object.values(state.entities.problem).find(
        item => item.code === code
      );
    };
  }
};
