import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

export const CodeLanguageInput = props => {
  const { options, value, onChange } = props;
  const languageOptions = React.useMemo(
    () =>
      options.map(lang => ({
        key: lang.id,
        value: lang.id,
        text: lang.title
      })),
    [options]
  );
  const handleChange = React.useCallback(
    (event, data) => {
      const lang = options.find(item => item.id === data.value);
      if (onChange) {
        onChange(lang);
      }
    },
    [options]
  );

  return (
    <Dropdown
      selection
      placeholder="Select language"
      options={languageOptions}
      onChange={handleChange}
      value={value ? value.id : 0}
    />
  );
};
