import * as React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';

export namespace FileUploadInput {
  export interface Props {
    file?: File;
    name?: string;
    placeHolder?: string;
    onChange?(file: File | undefined): void;
    style?: Record<string, any>;
  }
}

export const FileUploadInput: React.FC<FileUploadInput.Props> = (props) => {
  const { file, placeHolder = 'Chọn tệp...', onChange, name, style } = props;

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (!file) {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [file]);

  return (
    <Button
      as="div"
      labelPosition="right"
      style={{ display: 'flex', ...style }}
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <Button type="button" icon>
        <Icon name="attach" />
        Tệp
      </Button>
      <Label basic pointing="left" style={{ flexGrow: '1' }}>
        {file ? file.name : placeHolder}
      </Label>
      <input
        ref={inputRef}
        type="file"
        name={name}
        hidden
        onChange={(event) => {
          const { files } = event.target;
          if (files?.length === 1) {
            onChange?.(files[0]);
          }
        }}
      />
    </Button>
  );
};
