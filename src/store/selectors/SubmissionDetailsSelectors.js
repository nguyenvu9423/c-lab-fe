export const SubmissionDetailsSelectors = {
  byId: id => {
    return state => state.entities.submissionDetails[id];
  }
};
