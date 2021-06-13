import * as React from 'react';
import { Key } from '../../utility';

export function useSearchInput(props) {
  const { onChange, onSearchChange } = props;
  const [value, setInternalValue] = React.useState('');
  const [submittedValue, setSubmittedValue] = React.useState(undefined);
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const submitChange = React.useCallback(() => {
    setOpenDropdown(false);
    setSubmittedValue(value);
    onChange?.(value);
  }, [value, onChange]);

  const handleSearchChange = React.useCallback(
    (event, { value }) => {
      setInternalValue(value);
      onSearchChange?.(value);
      setOpenDropdown(true);
    },
    [onSearchChange]
  );

  const handleResultSelect = React.useCallback((event, { result }) => {
    setInternalValue(result.title);
    setOpenDropdown(false);
  }, []);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === Key.Enter) {
        submitChange();
      }
    },
    [submitChange]
  );

  const handleBlur = React.useCallback(() => {
    if (value !== submittedValue) {
      submitChange();
    }
  }, [submitChange]);

  return {
    value,
    openDropdown,
    submitChange,
    handleSearchChange,
    handleResultSelect,
    handleKeyDown,
    handleBlur,
  };
}
