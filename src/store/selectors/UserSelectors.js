export const UserSelectors = {
  byIds(ids) {
    return (state) => ids.map((id) => state.entities.user[id]);
  },
  byId(id) {
    return (state) => state.entities.user[id];
  },
};
