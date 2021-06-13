export const TagSelectors = {
  byIds(ids) {
    return (state) => ids.map((id) => state.entities.tag[id]);
  },
  byId(id) {
    return (state) => state.entities.tag[id];
  },
};
