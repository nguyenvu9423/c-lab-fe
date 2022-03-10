import Immutable from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

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
      code: {
        element: 'code',
      },
    })
  );
