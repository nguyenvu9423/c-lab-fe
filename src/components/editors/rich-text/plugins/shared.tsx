import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { Key } from 'ts-key-enum';

export namespace EditorTextInput {
  export interface Props {
    onAdd?: (url: string) => void;
    onClose?: () => void;
  }
}

export const EditorTextInput: React.FC<EditorTextInput.Props> = (props) => {
  const [value, setValue] = React.useState<string>('');
  const ref = React.useRef<Input>(null);
  React.useEffect(() => {
    ref.current?.focus();
  });

  const handleSubmit = React.useCallback(() => {
    if (value && value.trim().length > 0) {
      props.onAdd?.(value);
      props.onClose?.();
    }
  }, [value]);

  return (
    <Input
      ref={ref}
      action={<Button type="button" content="Add" onClick={handleSubmit} />}
      placeholder="URL"
      value={value}
      onChange={(event, { value }) => setValue(value)}
      onKeyDown={(event) => {
        if (event.key === Key.Enter) {
          handleSubmit();
        }
      }}
    />
  );
};
