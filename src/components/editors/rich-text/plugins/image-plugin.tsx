import * as React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { ToolbarChildrenProps } from '@draft-js-plugins/static-toolbar/lib/components/Toolbar';
import { EditorTextInput } from './shared';

namespace ImageButton {
  export interface Props extends ToolbarChildrenProps {
    onAdd?: (url: string) => void;
  }
}

export const ImageButton: React.FC<ImageButton.Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const onClose = React.useCallback(() => setOpen(false), []);
  const onOpen = React.useCallback(() => setOpen(true), []);

  return (
    <Popup
      content={<EditorTextInput onClose={onClose} onAdd={props.onAdd} />}
      on="click"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      trigger={
        <div style={{ display: 'inline-block' }}>
          <button className="toolbar-button" type="button" onClick={onOpen}>
            <Icon name="image" />
          </button>
        </div>
      }
    />
  );
};
