import * as React from 'react';
import * as Lodash from 'lodash';
import { TagService } from '../../service/TagService';
import { SelectConfig } from '../../components/select/SelectConfig';
import { TagDTO } from '.';
import { SearchInput } from '../../components/input';

export namespace TagNameSelect {
  export interface Props {
    onChange?(value: string): void;
  }
}

export const TagNameSelect: React.FC<TagNameSelect.Props> = (props) => {
  const { onChange } = props;

  const [tags, setTags] = React.useState<TagDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const load = React.useMemo(
    () =>
      Lodash.debounce((searchQuery) => {
        if (searchQuery) {
          setLoading(true);
          TagService.getTags(
            { page: 0, size: 10 },
            `name==*${searchQuery}*`
          ).then(({ data: { content } }) => {
            setTags(content);
            setLoading(false);
          });
        }
      }, SelectConfig.DELAY),
    []
  );
  const tagOptions = React.useMemo(
    () =>
      tags.map((tag) => ({
        key: tag.id,
        title: tag.name,
      })),
    [tags]
  );

  return (
    <SearchInput
      placeholder="Tên nhãn"
      loading={loading}
      options={tagOptions}
      onSubmit={onChange}
      onChange={(value) => {
        setTags([]);
        load(value);
      }}
    />
  );
};
