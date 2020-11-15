import * as React from 'react';
import * as Lodash from 'lodash';
import { Dropdown } from 'semantic-ui-react';
import UserService from '../../service/UserService';
import { SelectConfig } from '../../components/select';

export function UserSelect(props) {
  const { value, onChange } = props;

  const [users, setUsers] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState(undefined);

  const load = React.useCallback(
    Lodash.debounce(searchQuery => {
      if (searchQuery !== undefined) {
        setIsFetching(true);
        UserService.getUsersByFilters(`username==*${searchQuery}*`).then(
          ({ data: { content } }) => {
            setUsers(prevUsers => {
              const newUsers = [...prevUsers];
              content.forEach(user => {
                if (!prevUsers.some(obj => obj.id === user.id)) {
                  newUsers.push(user);
                }
              });
              return newUsers;
            });
            setIsFetching(false);
          }
        );
      }
    }, SelectConfig.DELAY),
    []
  );

  React.useEffect(() => load(searchQuery), [searchQuery]);

  const userOptions = React.useMemo(
    () =>
      users.map(user => ({
        key: user.id,
        value: user.id,
        text: user.username
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
        const user = users.find(user => user.id === value);
        onChange(user);
      }}
      options={userOptions}
      onSearchChange={(event, { searchQuery }) => {
        setSearchQuery(searchQuery);
      }}
      loading={isFetching}
      onOpen={() => {
        if (searchQuery === undefined) setSearchQuery('');
      }}
    />
  );
}
