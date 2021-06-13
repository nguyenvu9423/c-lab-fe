export const JudgeSelectors = {
  byId(id) {
    return (state) => state.entities.judge[id];
  },
};
