import * as React from 'react';
import { Search, SearchProps } from 'semantic-ui-react';
import { Key } from 'ts-key-enum';

export namespace SearchInput {
  export interface Props extends SearchProps {
    value?: string;
    options: { key: React.Key; title: string }[];
    onSubmit?(value: string): void;
    onChange?(value: string): void;
  }
}

export const SearchInput: React.FC<SearchInput.Props> = (props) => {
  const { value: passedValue, options, onSubmit, onChange, ...rest } = props;
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string>('');
  const submittedValueRef = React.useRef<string>('');

  const value = passedValue ?? internalValue;

  const submit = React.useCallback(
    (value: string) => {
      setOpenDropdown(false);
      submittedValueRef.current = value;
      onSubmit?.(value);
    },
    [onSubmit]
  );

  const handleValueChange = React.useCallback(
    (value: string) => {
      onChange?.(value);
      setInternalValue(value);
    },
    [onChange]
  );

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === Key.Enter) {
        submit(value);
      }
    },
    [value, submit]
  );

  const handleResultSelect = React.useCallback(
    (event, { result }) => {
      event.stopPropagation();
      handleValueChange(result.title);
      submit(result.title);
    },
    [submit, handleValueChange]
  );

  const handleBlur = React.useCallback(() => {
    if (value !== submittedValueRef.current) {
      submit(value);
    }
  }, [submit, value]);

  const handleSearchChange = React.useCallback(
    (event, { value }) => {
      handleValueChange(value);
      setOpenDropdown(true);
    },
    [handleValueChange]
  );

  return (
    <Search
      className="normal-input"
      fluid
      value={value}
      onSearchChange={(event, data) => {
        handleSearchChange(event, {
          ...data,
          value: data.value,
        });
      }}
      results={options}
      onResultSelect={handleResultSelect}
      open={openDropdown}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      {...rest}
    />
  );
};
