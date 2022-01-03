import * as React from 'react';

export function useHighlightSub(subId: number | undefined): number | undefined {
  const [highlightSubId, setHighLightedSubId] = React.useState(subId);

  React.useEffect(() => {
    if (subId) {
      if (highlightSubId !== subId) {
        setHighLightedSubId(subId);
      }

      const timeoutId = setTimeout(() => {
        setHighLightedSubId(undefined);
      }, 2500);

      return () => clearTimeout(timeoutId);
    }
  }, [subId]);

  return highlightSubId;
}
