import Immutable from 'immutable';
import { DefaultDraftBlockRenderMap, EditorState } from 'draft-js';

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
      'code-block': {
        element: 'pre',
      },
    })
  );

export type SetEditorState = React.Dispatch<React.SetStateAction<EditorState>>;
