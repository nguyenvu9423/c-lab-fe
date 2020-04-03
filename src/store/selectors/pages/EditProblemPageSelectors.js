export const ProblemEditPageSelectors = {
  state: () => {
    return state => state.editProblemPage;
  },
  problem: () => {
    return state => ProblemEditPageSelectors.state()(state).problem;
  }
};
