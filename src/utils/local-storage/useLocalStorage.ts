import * as React from 'react';
import { SetStateAction, Dispatch } from 'react';

export function useLocalStorage<T = unknown>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const rawValue = window.localStorage.getItem(key);
      return rawValue ? JSON.parse(rawValue) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  });

  const setValue = React.useCallback((setValueParam) => {
    setStoredValue((prevValue) => {
      const nextValue =
        typeof setValueParam === 'function'
          ? setValueParam(prevValue)
          : setValueParam;
      localStorage.setItem(key, JSON.stringify(nextValue));
      return nextValue;
    });
  }, []);

  return [storedValue, setValue];
}
