import * as React from 'react';
import { CodeLanguageService } from '../../service/CodeLanguageService';

export function useCodeLanguageSelect() {
  const [languageOptions, setLanguageOptions] = React.useState([]);
  const mapValueToLanguage = React.useCallback(
    value => languageOptions.find(option => option.value == value).fieldvalue,
    [languageOptions]
  );
  const mapLanguageToValue = React.useCallback(lang => lang.id, []);
  React.useEffect(() => {
    CodeLanguageService.getAll().then(({ data: langs }) => {
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
