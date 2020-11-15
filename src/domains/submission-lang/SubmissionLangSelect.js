import * as React from 'react';
import { SubmissionLangService } from '../../service/SubmissionLangService';
import { Dropdown } from 'semantic-ui-react';

export function useSubmissionLangSelect(props = {}) {
  const { initialLangs } = props;
  const [langs, setLangs] = React.useState(initialLangs ?? []);

  const languageOptions = React.useMemo(
    () =>
      langs.map(lang => ({
        value: lang.name,
        text: lang.title
      })),
    [langs]
  );

  const mapValueToLanguage = React.useCallback(
    value => langs.find(lang => value == lang.name),
    [langs]
  );
  const mapLanguageToValue = React.useCallback(lang => lang.name, []);

  React.useEffect(() => {
    let isMounted = true;
    SubmissionLangService.getAll().then(({ data: langs }) => {
      if (isMounted) {
        setLangs(langs);
      }
    });
    return () => (isMounted = false);
  }, []);

  return {
    languageOptions,
    mapValueToLanguage,
    mapLanguageToValue
  };
}

export function SubmissionLangSelect(props) {
  const { value, onChange } = props;
  const {
    languageOptions,
    mapLanguageToValue,
    mapValueToLanguage
  } = useSubmissionLangSelect({ initialLangs: value });

  return (
    <Dropdown
      selection
      multiple
      fluid
      options={languageOptions}
      value={value.map(mapLanguageToValue)}
      onChange={(event, data) => {
        onChange?.(data.value.map(mapValueToLanguage));
      }}
    />
  );
}
