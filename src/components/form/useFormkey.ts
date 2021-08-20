import * as React from 'react';

export function useFormKey(): [number, () => void] {
  const [key, setKey] = React.useState<number>(0);
  const changeKey = React.useCallback(
    () => setKey((current) => current + 1),
    []
  );
  return [key, changeKey];
}
