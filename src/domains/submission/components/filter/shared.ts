import { EQ, GE, LE } from '@rsql/ast';
import { DropdownItemProps } from 'semantic-ui-react';
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
  { key: EQ, value: EQ, text: '=' },
  { key: GE, value: GE, text: '>=' },
  { key: LE, value: LE, text: '<=' },
];
