import * as React from 'react';
import DefaultThumbnail from '../../../public/images/default-thumbnail.png';
import { Button, ButtonGroup, Image, Segment } from 'semantic-ui-react';
import { BackEndConfig } from '../../config';

export const ImageUploader: React.FC<{
  initialValue?: string | File | null;
  value?: string | File | null;
  onChange?: (value: string | File | null | undefined) => void;
}> = (props) => {
  const { initialValue, value, onChange } = props;

  const url = React.useMemo(
    () =>
      value
        ? value instanceof File
          ? URL.createObjectURL(value)
          : BackEndConfig.API_URL + value
        : undefined,
    [value],
  );

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  return (
    <div style={{ display: 'inline-block' }}>
      <Segment attached="top">
        <Image
          src={url ?? DefaultThumbnail}
          style={{
            width: 150,
            height: 150,
            objectFit: 'contain',
          }}
        />
      </Segment>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={(event) => {
          const files = event.target.files;
          if (files && files[0]) {
            onChange?.(files[0]);
          }
        }}
      />
      <ButtonGroup attached="bottom">
        <Button
          type="button"
          onClick={() => inputRef.current?.click()}
          icon="upload"
        />
        {url && (
          <Button
            type="button"
            icon="cancel"
            onClick={() => onChange?.(null)}
          />
        )}
        {initialValue && value !== initialValue && (
          <Button
            type="button"
            icon="redo"
            onClick={() => onChange?.(initialValue)}
          />
        )}
      </ButtonGroup>
    </div>
  );
};
