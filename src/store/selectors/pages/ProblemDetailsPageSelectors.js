export const ProblemDetailsPageSelectors = {
  state: () => {
    return (state) => state.problemDetailsPage;
  },
  problem: () => {
    return (state) => ProblemDetailsPageSelectors.state()(state).data.problem;
  },
};
