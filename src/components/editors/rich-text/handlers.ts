import {
  EditorState,
  getDefaultKeyBinding,
  Modifier,
  RichUtils,
} from 'draft-js';
import React from 'react';
import { Key } from 'ts-key-enum';
import { SetEditorState } from './shared';

export function useKeyHandler(setEditorState: SetEditorState) {
  const handleKeyCommand: Draft.EditorProps['handleKeyCommand'] =
    React.useCallback(
      (command, editorState) => {
        switch (command) {
          case 'toggle-katex':
            setEditorState(RichUtils.toggleInlineStyle(editorState, 'KATEX'));
            break;
          case 'toggle-bold':
            setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
            break;
          case 'toggle-italic':
            setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
            break;
          case 'toggle-underline':
            setEditorState(
              RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'),
            );
            break;
          default:
            return 'not-handled';
        }
        return 'handled';
      },
      [setEditorState],
    );

  const keyBindingFn: Draft.EditorProps['keyBindingFn'] = (event) => {
    if (event.getModifierState(Key.Control)) {
      switch (event.key) {
        case 'm':
          return 'toggle-katex';
        case 'b':
          return 'toggle-bold';
        case 'i':
          return 'toggle-italic';
        case 'u':
          return 'toggle-underline';
      }
    }

    return getDefaultKeyBinding(event);
  };

  return { handleKeyCommand, keyBindingFn };
}

export function useReturnHandler(
  setEditorState: SetEditorState,
): Draft.EditorProps['handleReturn'] {
  return React.useCallback(
    (evt, editorState) => {
      if (evt.key != 'Enter' || !evt.shiftKey) {
        return 'not-handled';
      }
      const newState = RichUtils.insertSoftNewline(editorState);
      setEditorState(newState);
      return 'handled';
    },
    [setEditorState],
  );
}

export function useTabHandler(
  setEditorState: SetEditorState,
): Draft.EditorProps['onTab'] {
  const handleTab: Draft.EditorProps['onTab'] = React.useCallback((e) => {
    e.preventDefault();

    setEditorState((currentState) => {
      const selection = currentState.getSelection();
      const blockType = currentState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

      if (
        blockType === 'unordered-list-item' ||
        blockType === 'ordered-list-item'
      ) {
        return RichUtils.onTab(e, currentState, 3);
      } else {
        const newContentState = Modifier.replaceText(
          currentState.getCurrentContent(),
          currentState.getSelection(),
          '    ',
        );

        return EditorState.push(
          currentState,
          newContentState,
          'insert-characters',
        );
      }
    });
  }, []);

  return handleTab;
}
