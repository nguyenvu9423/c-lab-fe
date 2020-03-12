export const ProblemSelectors = {
  byId(id) {
    return state => {
      return state.entities.problem[id];
    };
  },
  byCode(code) {
    return state => {
      return Object.values(state.entities.problem).find(
        item => item.code === code
      );
    };
  }
};
