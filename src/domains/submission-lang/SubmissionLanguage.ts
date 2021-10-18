import * as React from 'react';

export enum SubmissionLanguage {
  CPP_11 = 'CPP_11',
  CPP_14 = 'CPP_14',
  CPP_17 = 'CPP_17',

  FPC_3_0_4 = 'FPC_3_0_4',
}

export namespace SubmissionLanguage {
  export const values = [
    SubmissionLanguage.CPP_11,
    SubmissionLanguage.CPP_14,
    SubmissionLanguage.CPP_17,

    SubmissionLanguage.FPC_3_0_4,
  ];

  export const cmp = (
    l1: SubmissionLanguage,
    l2: SubmissionLanguage
  ): number => {
    return (
      SubmissionLanguage.values.indexOf(l1) -
      SubmissionLanguage.values.indexOf(l2)
    );
  };

  export function sort(langs: SubmissionLanguage[]): SubmissionLanguage[] {
    return [...langs].sort(cmp);
  }

  export function useInitial(
    allowedLangs: SubmissionLanguage[]
  ): SubmissionLanguage {
    const sortedLangs = React.useMemo(
      () => [...allowedLangs].sort(SubmissionLanguage.cmp),
      [allowedLangs]
    );

    const storedLang = localStorage.getItem('latestSubmissionLang');
    const matchedStoredLang = React.useMemo(
      () => allowedLangs.find((lang) => lang === storedLang),
      [allowedLangs, storedLang]
    );

    return matchedStoredLang ?? sortedLangs[0];
  }

  export function updateLatest(lang: SubmissionLanguage): void {
    if (localStorage.getItem('latestSubmissionLang') !== lang) {
      localStorage.setItem('latestSubmissionLang', lang);
    }
  }
}

export function getSubLangTitle(lang: SubmissionLanguage): string {
  return SubLangTitleMap[lang];
}

const SubLangTitleMap = {
  [SubmissionLanguage.CPP_11]: 'C++ 11',
  [SubmissionLanguage.CPP_14]: 'C++ 14',
  [SubmissionLanguage.CPP_17]: 'C++ 17',
  [SubmissionLanguage.FPC_3_0_4]: 'FPC 3.0.4',
};
