export const SubmissionSelector = {
  byIds(ids) {
    return state => {
      const {
        entities: { submission }
      } = state;
      return ids.map(id => submission[id]);
    };
  },
  byUserAndProblem(user, problem) {
    return state => {
      const submissionMap = state.entities.submission;
      return Object.values(submissionMap).filter(
        submission =>
          submission.submittingUser.id === user.id &&
          submission.targetProblem.id === problem.id
      );
    };
  },

  byProblemId(problemId) {
    return state => {
      const submissionMap = state.entities.submission;
      return Object.values(submissionMap).filter(
        submission => submission.targetProblem.id == problemId
      );
    };
  }
};
