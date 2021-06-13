export const RoleSelectors = {
  byIds(ids) {
    return (state) => ids.map((id) => state.entities.role[id]);
  },
  byId(id) {
    return (state) => (id ? state.entities.role[id] : undefined);
  },
};
