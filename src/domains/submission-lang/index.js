import * as React from 'react';
import { SubmissionLangService } from '../../service/SubmissionLangService';

export function useSubmissionLangSelect() {
  const [languageOptions, setLanguageOptions] = React.useState([]);
  const mapValueToLanguage = React.useCallback(
    value => languageOptions.find(option => option.value == value).fieldvalue,
    [languageOptions]
  );
  const mapLanguageToValue = React.useCallback(lang => lang.id, []);
  React.useEffect(() => {
    SubmissionLangService.getAll().then(({ data: langs }) => {
      setLanguageOptions(
        langs.map(lang => ({
          text: lang.title,
          value: lang.id,
          fieldvalue: lang
        }))
      );
    });
  }, []);
  return {
    languageOptions,
    mapValueToLanguage,
    mapLanguageToValue
  };
}
