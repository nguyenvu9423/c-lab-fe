export enum SubmissionLanguage {
  CPP_11 = 'CPP_11',
  FPC_3_0_4 = 'FPC_3_0_4',
}

export namespace SubmissionLanguage {
  export const values = [
    SubmissionLanguage.CPP_11,
    SubmissionLanguage.FPC_3_0_4,
  ];
}

const SubLangTitleMap = {
  [SubmissionLanguage.CPP_11]: 'C++ 11',
  [SubmissionLanguage.FPC_3_0_4]: 'FPC 3.0.4',
};

export function getSubLangTitle(lang: SubmissionLanguage): string {
  return SubLangTitleMap[lang];
}
