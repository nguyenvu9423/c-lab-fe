import * as React from 'react';
import { createBlockStyleButton } from '@draft-js-plugins/buttons';
import { Icon } from 'semantic-ui-react';

export const CodeBlockButton = createBlockStyleButton({
  blockType: 'code',
  children: <Icon name="code" />,
});
