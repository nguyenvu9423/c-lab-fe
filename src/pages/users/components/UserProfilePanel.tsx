import * as React from 'react';
import * as moment from 'moment';
import { Header, Table, Dimmer, Button } from 'semantic-ui-react';
import { normalize } from 'normalizr';
import { useDispatch, useSelector } from 'react-redux';
import { updateEntity } from '../../../store/actions';
import { DateFormat } from '../../../config';
import { Avatar } from '../../../components/avatar/Avatar';
import { UserService } from '../../../services/UserService';
import { userSchema } from '../../../entity-schemas/userSchema';
import { User } from '../../../domains/user';
import { DateTimeUtils } from '../../../utils/data-type/DateTimeUtils';
import { ConstSelectors, PrincipalSelectors } from '../../../store/selectors';

export namespace UserProfilePanel {
  export interface Props {
    user: User;
  }
}

export const UserProfilePanel: React.FC<UserProfilePanel.Props> = (props) => {
  const { user } = props;
  return (
    <Table celled structured>
      <Table.Body>
        <Table.Row>
          <Table.Cell rowSpan="5" textAlign="center">
            <AvatarForm user={user} />
          </Table.Cell>
          <Table.Cell width="4">
            <Header as="h4" content="Tên" />
          </Table.Cell>
          <Table.Cell width="8">{user.firstName}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" content="Họ" />
          </Table.Cell>
          <Table.Cell>{user.lastName}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" content="Email" />
          </Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" content="Ngày sinh" />
          </Table.Cell>
          <Table.Cell>
            {user.birthday
              ? DateTimeUtils.of(user.birthday).format(DateFormat.MEDIUM)
              : '--'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as="h4" content="Nơi làm việc" />
          </Table.Cell>
          <Table.Cell>{user.workplace ? user.workplace : '--'}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export namespace AvatarForm {
  export interface Props {
    user: User;
  }
}

export const AvatarForm: React.FC<AvatarForm.Props> = (props) => {
  const { user } = props;
  const [dimmerActive, setDimmerActive] = React.useState(false);
  const dispatch = useDispatch();
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const handleChange = React.useCallback(
    (event) => {
      const files = event.target.files;
      if (files.length === 1) {
        const formData = new FormData();
        formData.append('avatarFile', files[0]);
        UserService.updateAvatar(user.username, formData).then(({ data }) => {
          const { entities } = normalize(data, userSchema);
          dispatch(updateEntity({ entities }));
        });
      }
    },
    [dispatch, user]
  );

  const handleRemove = React.useCallback(() => {
    const formData = new FormData();
    UserService.updateAvatar(user.username, formData).then((response) => {
      const { entities } = normalize(response.data, userSchema);
      dispatch(updateEntity({ entities }));
    });
  }, [dispatch, user]);

  const isPrincipal = useSelector(
    user
      ? PrincipalSelectors.isPrincipal(user)
      : ConstSelectors.value(undefined)
  );

  return (
    <div className="avatar-form">
      {isPrincipal ? (
        <>
          <Dimmer.Dimmable
            dimmed={dimmerActive}
            onMouseEnter={() => setDimmerActive(true)}
            onMouseLeave={() => setDimmerActive(false)}
          >
            <Avatar user={user} />
            <Dimmer active={dimmerActive} inverted style={{ zIndex: 'unset' }}>
              <Button
                circular
                icon="photo"
                color="blue"
                size="medium"
                onClick={() => fileRef.current?.click()}
              />
              {user.avatarUrl && (
                <Button
                  circular
                  negative
                  icon="remove"
                  size="medium"
                  onClick={handleRemove}
                />
              )}
            </Dimmer>
          </Dimmer.Dimmable>
          <form>
            <input
              ref={fileRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
          </form>
        </>
      ) : (
        <Avatar user={user} />
      )}

      <Header as="h4">{user.username}</Header>
    </div>
  );
};
