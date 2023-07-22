import * as React from 'react';
import * as Lodash from 'lodash';
import { Dropdown } from 'semantic-ui-react';
import { UserService } from '../../services/UserService';
import { SelectConfig } from '@/components/select';
import { UserDTO } from '../../services/dtos';

export namespace UserSelect {
  export interface Props {
    placeholder?: string;
    onChange?(value?: UserDTO): void;
    value?: UserDTO;
  }
}

export const UserSelect: React.FC<UserSelect.Props> = (props) => {
  const { value, onChange } = props;

  const [users, setUsers] = React.useState<UserDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>();
  const [searchQuery, setSearchQuery] = React.useState<string | undefined>(
    undefined
  );

  const load = React.useMemo(
    () =>
      Lodash.debounce((searchQuery) => {
        if (searchQuery !== undefined) {
          setLoading(true);
          UserService.getAll(`username==*${searchQuery}*`)
            .then(({ data: { content } }) => {
              setUsers(content);
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
            });
        }
      }, SelectConfig.DELAY),
    []
  );

  React.useEffect(() => load(''), []);

  const userOptions = React.useMemo(
    () =>
      users.map((user) => ({
        key: user.id,
        value: user.id,
        text: user.username,
      })),
    [users]
  );

  return (
    <Dropdown
      search
      selection
      fluid
      clearable
      {...props}
      value={value ? value.id : undefined}
      onChange={(event, { value }) => {
        const user = users.find((user) => user.id === value);
        onChange?.(user);
      }}
      options={userOptions}
      onSearchChange={(event, { searchQuery }) => {
        setSearchQuery(searchQuery);
      }}
      loading={loading}
      onOpen={() => {
        if (searchQuery === undefined) setSearchQuery('');
      }}
    />
  );
};
