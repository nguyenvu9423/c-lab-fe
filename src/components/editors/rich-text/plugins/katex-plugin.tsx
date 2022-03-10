import * as React from 'react';
import katex from 'katex';

import { ToolbarChildrenProps } from '@draft-js-plugins/static-toolbar/lib/components/Toolbar';
import {
  ContentBlock,
  ContentState,
  DraftDecorator,
  EditorState,
  Modifier,
} from 'draft-js';
import { Icon, Popup } from 'semantic-ui-react';
import { EditorTextInput } from './shared';

export const KatexButton: React.FC<ToolbarChildrenProps> = (props) => {
  const { getEditorState, setEditorState } = props;

  const handleAdd = React.useCallback(
    (katex: string) => {
      const editorState = getEditorState();
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();

      const contentStateWithEntity = contentState.createEntity(
        'KATEX',
        'MUTABLE',
        { text: katex }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newContentState = Modifier.insertText(
        contentState,
        selection,
        '$',
        undefined,
        entityKey
      );

      setEditorState(
        EditorState.set(editorState, { currentContent: newContentState })
      );
    },
    [getEditorState, setEditorState]
  );

  const [open, setOpen] = React.useState(false);
  const onClose = React.useCallback(() => setOpen(false), []);
  const onOpen = React.useCallback(() => setOpen(true), []);

  return (
    <Popup
      content={<EditorTextInput onClose={onClose} onAdd={handleAdd} />}
      on="click"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      trigger={
        <div style={{ display: 'inline-block' }}>
          <button className="toolbar-button" type="button" onClick={onOpen}>
            <Icon name="book" />
          </button>
        </div>
      }
    />
  );
};

export const katexDecorator: DraftDecorator = {
  strategy: canHandleKatex,
  component: KatexBlock,
};

function KatexBlock(props) {
  const { text } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <span>
      <span dangerouslySetInnerHTML={{ __html: katex.renderToString(text) }} />
      <span style={{ display: 'none' }}>{props.children}</span>
    </span>
  );
}

function canHandleKatex(
  block: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) {
  block.findEntityRanges((character) => {
    const entityKey = character.getEntity();

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'KATEX'
    );
  }, callback);
}
