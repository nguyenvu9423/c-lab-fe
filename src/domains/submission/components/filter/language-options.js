import * as React from 'react';

export function useProblemLanguageOptions({ problem }) {
  const languageOptions = React.useMemo(
    () => [
      { key: 'ANY', text: 'Any', value: 'ANY' },
      ...problem.allowedLanguages.map((lang) => ({
        key: lang.name,
        value: lang.name,
        text: lang.title,
      })),
    ],
    [problem]
  );
  const mapValueToLanguage = React.useCallback(
    (value) => problem.allowedLanguages.find((lang) => lang.name === value),
    [problem]
  );

  return {
    languageOptions,
    mapValueToLanguage,
  };
}
