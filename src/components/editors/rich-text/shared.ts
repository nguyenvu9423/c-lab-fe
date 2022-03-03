import Immutable from 'immutable';
import { ContentBlock, DefaultDraftBlockRenderMap } from 'draft-js';

export function blockStyleFn(contentBlock: ContentBlock) {
  if (contentBlock.getType() == 'code-block') {
    return 'code-block';
  }
}

export const blockRenderMap: Draft.DraftBlockRenderMap =
  DefaultDraftBlockRenderMap.merge(
    Immutable.Map({
      'header-one': {
        element: 'h2',
      },
      'header-two': {
        element: 'h3',
      },
      'header-three': {
        element: 'h4',
      },
    })
  );
