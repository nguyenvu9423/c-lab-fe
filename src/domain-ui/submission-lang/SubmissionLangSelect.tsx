import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { getSubLangTitle, SubmissionLanguage } from '@/domains/submission-lang';

export namespace SubmissionLangSelect {
  export interface Props {
    value?: SubmissionLanguage;
    options: SubmissionLanguage[];
    onChange?: (value: SubmissionLanguage) => void;
  }
}

export const SubmissionLangSelect: React.FC<SubmissionLangSelect.Props> = (
  props
) => {
  const { value, options: langs, onChange } = props;
  const sortedLangs = React.useMemo(
    () => SubmissionLanguage.sort(langs),
    [langs]
  );

  return (
    <Dropdown
      selection
      placeholder="Select language"
      options={sortedLangs.map((lang) => ({
        value: lang,
        text: getSubLangTitle(lang),
      }))}
      onChange={(event, data) => {
        const match = sortedLangs.find((lang) => lang === data.value);
        if (match && onChange) {
          onChange(match);
        }
      }}
      value={value}
    />
  );
};
