import * as React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import {
  getSubLangTitle,
  SubmissionLanguage,
} from '@/domains/submission-lang/SubmissionLanguage';

const options = SubmissionLanguage.values.map((lang) => ({
  text: getSubLangTitle(lang),
  value: lang,
}));

export namespace SubmissionLangMultiSelect {
  export interface Props {
    value: SubmissionLanguage[];
    onChange?(value: SubmissionLanguage): void;
    onBlur?(event: React.FocusEvent<HTMLElement>, data: DropdownProps): void;
  }
}

export const SubmissionLangMultiSelect: React.FC<SubmissionLangMultiSelect.Props> =
  (props) => {
    const { value, onChange, onBlur } = props;

    return (
      <Dropdown
        selection
        multiple
        fluid
        options={options}
        value={value}
        onChange={(event, data) => {
          onChange?.(data.value as SubmissionLanguage);
        }}
        onBlur={onBlur}
      />
    );
  };
