export const ArticleSelectors = {
  byId: (id) => {
    return (state) => state.entities.article[id];
  },
  byIds: (ids) => {
    return (state) => ids.map((id) => state.entities.article[id]);
  },
};
