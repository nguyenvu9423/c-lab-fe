import { DropdownItemProps } from 'semantic-ui-react';
import { ComparisonOperator } from '../../../../utility/filter';
import {
  getSubLangTitle,
  SubmissionLanguage,
} from '../../../submission-lang/SubmissionLanguage';

export const languageOptions = [
  { key: '', text: '' },
  ...SubmissionLanguage.values.map((lang) => ({
    key: lang,
    value: lang,
    text: getSubLangTitle(lang),
  })),
];

export const operationOptions: DropdownItemProps[] = [
  { key: '', text: '' },
].concat(
  ComparisonOperator.values.map((type) => ({
    key: type,
    value: type,
    text: ComparisonOperator.getDisplayedValue(type),
  }))
);
