import * as React from 'react';
import { createBlockStyleButton } from '@draft-js-plugins/buttons';
import { Icon } from 'semantic-ui-react';
import { ContentBlock } from 'draft-js';

export const CodeBlockButton = createBlockStyleButton({
  blockType: 'code-block',
  children: <Icon name="code" />,
});

export function codeBlockStyleFn(block: ContentBlock): string {
  return block.getType() === 'code-block' ? 'code-block' : '';
}
