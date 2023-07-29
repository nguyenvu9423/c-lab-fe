import * as React from 'react';
import katex from 'katex';

import { ContentBlock, DraftDecorator } from 'draft-js';
import { Icon, Popup } from 'semantic-ui-react';
import { createInlineStyleButton } from '@draft-js-plugins/buttons';

export const KatextInlineButton = createInlineStyleButton({
  style: 'KATEX',
  children: <Icon name="book" />,
});

export const KatexDecorator: DraftDecorator = {
  strategy: canHandleKatex,
  component: KatexBlock,
};

export const ReadonlyKatexDecorator: DraftDecorator = {
  strategy: canHandleKatex,
  component: ReadonlyKatexBlock,
};

function canHandleKatex(
  block: ContentBlock,
  callback: (start: number, end: number) => void,
) {
  block.findStyleRanges((character) => {
    return character.hasStyle('KATEX');
  }, callback);
}

function KatexBlock(props) {
  const { decoratedText } = props;

  return (
    <Popup
      trigger={<span className="katex-inline-style">{props.children}</span>}
      content={
        <span
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(decoratedText, {
              throwOnError: false,
            }),
          }}
        />
      }
    />
  );
}

function ReadonlyKatexBlock(props) {
  const { decoratedText } = props;
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(decoratedText, {
          throwOnError: false,
        }),
      }}
    />
  );
}
