export const JudgeConfigSelectors = {
  byId(id) {
    return (state) => {
      return state.entities.judgeConfig[id];
    };
  },
  byIds(ids) {
    return (state) => {
      return ids.map((id) => state.entities.judgeConfig[id]);
    };
  },
};
