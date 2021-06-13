export const SubmissionSelector = {
  byIds(ids) {
    return (state) => {
      const {
        entities: { submission },
      } = state;
      return ids.map((id) => submission[id]);
    };
  },
  byId(id) {
    return (state) => state.entities.submission[id];
  },
  byUserAndProblem(user, problem) {
    return (state) => {
      const submissionMap = state.entities.submission;
      return Object.values(submissionMap).filter(
        (submission) =>
          submission.user.id === user.id && submission.problem.id === problem.id
      );
    };
  },

  byProblemId(problemId) {
    return (state) => {
      const submissionMap = state.entities.submission;
      return Object.values(submissionMap).filter(
        (submission) => submission.problem.id == problemId
      );
    };
  },
};
