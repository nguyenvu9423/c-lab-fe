import * as React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { PermissionService } from '@/services';
import { Permission } from '@/domains/role';

export namespace PermissionSelect {
  export interface Props extends Omit<DropdownProps, 'onChange'> {
    value: Permission[];
    onChange?(value: Permission[]): void;
  }
}

export const PermissionSelect: React.FC<PermissionSelect.Props> = (props) => {
  const { value, onChange, ...restProps } = props;

  const [loading, setLoading] = React.useState(false);
  const [permissions, setPermissions] = React.useState<Permission[]>([]);

  React.useEffect(() => {
    setLoading(true);
    PermissionService.getPermissions().then(({ data }) => {
      setPermissions(data);
      setLoading(false);
    });
  }, []);

  const options = React.useMemo(
    () =>
      permissions.map((permission) => ({
        key: permission.id,
        value: permission.id,
        text: permission.name,
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
      loading={loading}
      options={options}
      disabled={loading}
      value={value?.map((permission) => permission.id)}
      onChange={(event, data) => {
        if (!Array.isArray(data.value)) {
          throw new Error('Value in dropdown is not an array');
        }
        const pers = data.value.map((id) => {
          const per = permissions.find((per) => per.id === id);
          if (!per) throw new Error('Could not find permission');
          return per;
        });

        onChange?.(pers);
      }}
      {...restProps}
    />
  );
};
