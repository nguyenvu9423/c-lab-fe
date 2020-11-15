import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

export const SubmissionLangInput = props => {
  const { problem, value, onChange } = props;
  const languageOptions = React.useMemo(
    () =>
      problem.allowedLanguages.map(lang => ({
        key: lang.id,
        value: lang.name,
        text: lang.title
      })),
    [problem]
  );
  const handleChange = React.useCallback(
    (event, data) => {
      const lang = problem.allowedLanguages.find(
        item => item.name === data.value
      );
      if (onChange) {
        onChange(lang);
      }
    },
    [problem]
  );

  return (
    <Dropdown
      selection
      placeholder="Select language"
      options={languageOptions}
      onChange={handleChange}
      value={value ? value.name : 0}
    />
  );
};
