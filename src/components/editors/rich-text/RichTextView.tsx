import * as React from 'react';
import {
  ContentBlock,
  convertFromRaw,
  EditorState,
  RawDraftContentState,
} from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import { ReadonlyKatexDecorator } from './plugins';
import { slugifyHeading } from '../../../pages/articles/utils';

import '@draft-js-plugins/image/lib/plugin.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import { blockRenderMap } from './shared';

const alignmentPlugin = createAlignmentPlugin();
const linkPlugin = createLinkPlugin();
const resizeablePlugin = createResizeablePlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
);

const imagePlugin = createImagePlugin({ decorator });

export const RichTextView: React.FC<{ contentState: RawDraftContentState }> = (
  props,
) => {
  const [editorState, setEditorState] = React.useState<EditorState>(
    props.contentState
      ? EditorState.createWithContent(convertFromRaw(props.contentState))
      : EditorState.createEmpty(),
  );

  return (
    <div className="text-container">
      <Editor
        blockRenderMap={blockRenderMap}
        decorators={[ReadonlyKatexDecorator]}
        editorState={editorState}
        onChange={setEditorState}
        blockRendererFn={blockRendererFn}
        plugins={[imagePlugin, alignmentPlugin, resizeablePlugin, linkPlugin]}
        readOnly={true}
      />
    </div>
  );
};

const AnchorHeading: React.FC<any> = (props) => {
  const { key, content } = props.blockProps;

  const id = slugifyHeading(content, key);
  return (
    <>
      <span className="anchor-tag" id={id}>
        <a href={`#${id}`}>#</a>
      </span>
      {content}
    </>
  );
};

function blockRendererFn(contentBlock: ContentBlock) {
  const type = contentBlock.getType();

  if (
    type === 'header-one' ||
    type === 'header-two' ||
    type === 'header-three'
  ) {
    return {
      component: AnchorHeading,
      editable: false,
      props: {
        content: contentBlock.getText(),
        key: contentBlock.getKey(),
      },
    };
  }
}
