import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { PermissionService } from '../../service/PermissionService';

function usePermissionSearch() {
  const [isFetching, setIsFetching] = React.useState(false);
  const [permissions, setPermissions] = React.useState([]);

  React.useEffect(() => {
    setIsFetching(true);
    PermissionService.getAll().then(({ data }) => {
      setPermissions(data);
      setIsFetching(false);
    });
  }, []);

  return { isFetching, permissions };
}

export function PermissionSelect(props) {
  const { value, onChange, ...restProps } = props;

  const { isFetching, permissions } = usePermissionSearch();

  const options = React.useMemo(
    () =>
      permissions.map((per) => ({
        key: per.name,
        value: per.name,
        text: per.name,
      })),
    [permissions]
  );
  return (
    <Dropdown
      selection
      multiple
      search
      fluid
      placeholder="Permissions"
      loading={isFetching}
      options={options}
      disabled={isFetching}
      value={value?.map((permission) => permission.name)}
      onChange={(event, data) => {
        const pers = data.value.map((perName) =>
          permissions.find((per) => per.name === perName)
        );
        onChange?.(pers);
      }}
      {...restProps}
    />
  );
}
