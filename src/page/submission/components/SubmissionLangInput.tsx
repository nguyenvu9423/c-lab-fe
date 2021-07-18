import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import {
  getSubLangTitle,
  SubmissionLanguage,
} from '../../../domains/submission-lang/SubmissionLanguage';
import { Problem } from '../../../domains/problem';

export namespace SubmissionLangInput {
  export interface Props {
    problem: Problem;
    value: SubmissionLanguage;
    onChange: (value: SubmissionLanguage) => void;
  }
}

export const SubmissionLangInput: React.FC<SubmissionLangInput.Props> = (
  props
) => {
  const { problem, value, onChange } = props;

  const languageOptions = React.useMemo(
    () =>
      problem.allowedLanguages.map((lang) => ({
        key: lang,
        value: lang,
        text: getSubLangTitle(lang),
      })),
    [problem]
  );

  const handleChange = React.useCallback(
    (event, data) => onChange?.(data.value),
    [problem]
  );

  return (
    <Dropdown
      selection
      placeholder="Select language"
      options={languageOptions}
      onChange={handleChange}
      value={value}
    />
  );
};
