export const TestPackageSelectors = {
  byId(id) {
    return state => {
      return state.entities.testPackage[id];
    };
  },
  byIds(ids) {
    return state => {
      return ids.map(id => state.entities.testPackage[id]);
    };
  }
};
