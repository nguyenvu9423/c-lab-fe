import { getSelector, getValue, isComparisonNode } from '@rsql/ast';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { OnlyNameTag } from '../../domains/tag';
import { RsqlUtils } from '../../utility';

export namespace PageUtils {
  export function useTotalPages(
    totalPages: number | undefined
  ): number | undefined {
    const [result, setResult] = React.useState<number | undefined>(undefined);

    React.useEffect(() => {
      if (totalPages !== undefined) {
        setResult(Math.max(totalPages, 1));
      }
    }, [totalPages]);

    return result;
  }

  export function useCorrectPage(page: number, totalPages: number | undefined) {
    const [searchParams, setSearchParams] = useSearchParams();

    if (totalPages === undefined) return;
    if (page > totalPages) {
      searchParams.set('page', totalPages.toString());
      setSearchParams(searchParams);
    }
  }

  export function useCorrectPageListener(
    page: number,
    totalPages: number | undefined,
    handler: (page: number) => void
  ) {
    React.useEffect(() => {
      if (totalPages === undefined) return;
      if (page > totalPages) {
        handler(totalPages);
      }
    }, [page, totalPages]);
  }

  export function getTagsFromQuery(query: string): OnlyNameTag[] {
    const node = RsqlUtils.parse(query);
    if (isComparisonNode(node, '=include=') && getSelector(node) === 'tags') {
      const tagNames = getValue(node) as string[];
      return tagNames.map((name) => ({ name }));
    }

    return [];
  }
}
