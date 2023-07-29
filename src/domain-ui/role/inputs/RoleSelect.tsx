import * as React from 'react';
import { RoleService } from '@/services';
import { Dropdown } from 'semantic-ui-react';
import { Role } from '@/domains/role';

export namespace RoleSelect {
  export interface Props {
    onChange?(role: Role): void;
    value?: { id: number };
  }
}

export const RoleSelect: React.FC<RoleSelect.Props> = (props) => {
  const { onChange } = props;
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [loading, setLoading] = React.useState<boolean>();

  const load = React.useCallback(() => {
    setLoading(true);
    RoleService.getRoles()
      .then(({ data: { content } }) => {
        setRoles(content);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const roleOptions = React.useMemo(
    () =>
      roles.map((role) => ({
        key: role.id,
        text: role.name,
        value: role.id,
      })),
    [roles],
  );

  React.useEffect(() => {
    load();
  }, []);

  return (
    <Dropdown
      selection
      value={props.value?.id}
      options={roleOptions}
      loading={loading}
      onChange={(event, data) => {
        const role = roles.find((role) => role.id === data.value);
        if (!role) {
          throw new Error('Could not find role in RoleSelect');
        }
        onChange?.(role);
      }}
    />
  );
};
