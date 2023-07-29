import * as React from 'react';
import { DataHolderState } from '../../store/reducers/data-holders/shared';

export function useTotalPages(
  state: DataHolderState<Record<string, any>, { totalPages: number }>,
): number {
  const [totalPages, setTotalPages] = React.useState<number>(0);

  React.useEffect(() => {
    if (DataHolderState.isLoaded(state)) {
      setTotalPages(state.totalPages);
    }
  }, [state]);
  return totalPages;
}
