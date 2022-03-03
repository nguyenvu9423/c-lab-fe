import * as React from 'react';
import classNames from 'classnames';
import {
  EditorState,
  convertToRaw,
  RawDraftContentState,
  convertFromRaw,
  RichUtils,
  Modifier,
} from 'draft-js';

import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createToolbarPlugin, {
  Separator,
} from '@draft-js-plugins/static-toolbar';
import createImagePlugin from '@draft-js-plugins/image';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createFocusPlugin from '@draft-js-plugins/focus';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createResizeablePlugin from '@draft-js-plugins/resizeable';

import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/image/lib/plugin.css';
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import 'draft-js/dist/Draft.css';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from '@draft-js-plugins/buttons';
import {
  ImageButton,
  KatexButton,
  katexDecorator,
  CodeBlockButton,
  codeBlockStyleFn,
} from './plugins';
import { blockRenderMap } from './shared';

const alignmentPlugin = createAlignmentPlugin();

const focusPlugin = createFocusPlugin();
const linkPlugin = createLinkPlugin();
const toolbarPlugin = createToolbarPlugin();
const resizeablePlugin = createResizeablePlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });
const plugins = [
  toolbarPlugin,
  imagePlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  linkPlugin,
];

const { Toolbar } = toolbarPlugin;
const { AlignmentTool } = alignmentPlugin;

export const RichTextEditor: React.FC<{
  className: string;
  initialValue?: RawDraftContentState;
  onChange?: (state: RawDraftContentState) => void;
  readonly?: boolean;
}> = (props) => {
  const [editorState, setEditorState] = React.useState<EditorState>(
    props.initialValue
      ? EditorState.createWithContent(convertFromRaw(props.initialValue))
      : EditorState.createEmpty()
  );

  const handleReturn = useHandleReturn(setEditorState);
  const handleTab = useHandleTab(setEditorState);
  const handleAddImage = React.useCallback((url: string) => {
    setEditorState((state) => imagePlugin.addImage(state, url, {}));
  }, []);

  return (
    <div
      className={
        props.readonly
          ? props.className
          : classNames(props.className, 'editor-wrapper', 'editor')
      }
    >
      <Editor
        decorators={[katexDecorator]}
        editorState={editorState}
        onChange={setEditorState}
        blockStyleFn={codeBlockStyleFn}
        blockRenderMap={blockRenderMap}
        handleReturn={handleReturn}
        onTab={handleTab}
        plugins={plugins}
        onBlur={() =>
          props.onChange?.(convertToRaw(editorState.getCurrentContent()))
        }
        readOnly={props.readonly}
      />
      {!props.readonly && (
        <>
          <Toolbar>
            {(props) => (
              <>
                <BoldButton {...props} />
                <ItalicButton {...props} />
                <UnderlineButton {...props} />
                <CodeButton {...props} />
                <Separator />
                <HeadlineOneButton {...props} />
                <HeadlineTwoButton {...props} />
                <HeadlineThreeButton {...props} />
                <UnorderedListButton {...props} />
                <OrderedListButton {...props} />
                <BlockquoteButton {...props} />
                <CodeBlockButton {...props} />
                <linkPlugin.LinkButton {...props} />
                <Separator />
                <ImageButton {...props} onAdd={handleAddImage} />
                <KatexButton {...props} />
              </>
            )}
          </Toolbar>
          <AlignmentTool />
        </>
      )}
    </div>
  );
};

function useHandleReturn(
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
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
    [setEditorState]
  );
}

function useHandleTab(
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
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
          '    '
        );

        return EditorState.push(
          currentState,
          newContentState,
          'insert-characters'
        );
      }
    });
  }, []);

  return handleTab;
}
