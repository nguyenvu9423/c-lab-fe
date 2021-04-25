export const JudgerType = {
  LINES_WORDS_CASE: 'LinesWordsCase',
  CUSTOM: 'Custom'
};

export const judgerOptions = [
  {
    text: 'Default Judger',
    value: JudgerType.LINES_WORDS_CASE
  },
  {
    text: 'Custom Judger',
    value: JudgerType.CUSTOM
  }
];
