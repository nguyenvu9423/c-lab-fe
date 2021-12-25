import * as React from 'react';
import { Button, Label } from 'semantic-ui-react';

export namespace PutFileInput {
  export interface Props {
    file?: File | UploadedFile;
    onChange?(file: File | null): void;
  }

  export interface UploadedFile {
    name: string;
    uploaded: true;
    downloadLink: string;
  }
}

export const PutFileInput: React.FC<PutFileInput.Props> = (props) => {
  const { file, onChange } = props;
  const ref = React.useRef<HTMLInputElement | null>(null);
  const handleChange = React.useCallback(
    (event) => {
      const { files } = event.target;
      if (files.length === 1) {
        onChange?.(files[0]);
      }
    },
    [onChange]
  );

  const handleReset = React.useCallback(() => {
    if (ref.current) {
      ref.current.value = '';
    }

    onChange?.(null);
  }, [onChange]);

  return (
    <div className="put-file-input">
      <Button as="div" labelPosition="left">
        <Label className="file-name" as="a" basic>
          {file ? file.name : 'Chưa có file'}
        </Label>
      </Button>
      {file ? (
        'uploaded' in file ? (
          <Button
            type="button"
            icon="download"
            as="a"
            href={file.downloadLink}
          />
        ) : (
          <Button type="button" icon="repeat" onClick={handleReset} />
        )
      ) : undefined}
      <Button
        type="button"
        icon="folder open"
        content="Chọn"
        onClick={() => {
          ref.current?.click();
        }}
      />
      <input ref={ref} type="file" hidden onChange={handleChange} />
    </div>
  );
};
