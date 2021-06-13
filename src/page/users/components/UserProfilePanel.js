import * as React from 'react';
import moment from 'moment';
import { Header, Table, Dimmer, Button } from 'semantic-ui-react';
import { normalize } from 'normalizr';
import { useDispatch } from 'react-redux';
import { updateEntity } from '../../../store/actions';
import { DateFormat } from '../../../constant/DateFormat';
import { Avatar } from '../../../components/avatar/Avatar';
import { UserService } from '../../../service/UserService';
import { userSchema } from '../../../entity-schemas/userSchema';

export function UserProfilePanel(props) {
  const { user } = props;
  return (
    <Table celled structured>
      <Table.Body>
        <Table.Row>
          <Table.Cell rowSpan="4" textAlign="center">
            <AvatarForm user={user} />
          </Table.Cell>
          <Table.Cell>
            <Header as={'h4'} content={'First name'} />
          </Table.Cell>
          <Table.Cell>{user && user.firstName}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as={'h4'} content={'Last Name'} />
          </Table.Cell>
          <Table.Cell>{user && user.lastName}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as={'h4'} content={'Email'} />
          </Table.Cell>
          <Table.Cell>{user && user.email}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Header as={'h4'} content={'Date of Birth'} />
          </Table.Cell>
          <Table.Cell>
            {user && moment(user.birthDay).format(DateFormat.MediumLength)}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

function AvatarForm(props) {
  const { user } = props;
  const [dimmerActive, setDimmerActive] = React.useState(true);
  const dispatch = useDispatch();
  const fileRef = React.useRef();
  const handleChange = React.useCallback((event) => {
    const files = event.target.files;
    if (files.length === 1) {
      const formData = new FormData();
      formData.append('avatarFile', files[0]);
      UserService.updateAvatar(formData).then((response) => {
        const { entities } = normalize(response.data, userSchema);
        dispatch(updateEntity(entities));
      });
    }
  }, []);
  const handleRemove = React.useCallback(() => {
    const formData = new FormData();
    formData.append('avatarFile', null);
    UserService.updateAvatar(formData).then((response) => {
      const { entities } = normalize(response.data, userSchema);
      dispatch(updateEntity(entities));
    });
  });
  return (
    <>
      <Dimmer.Dimmable
        dimmed={dimmerActive}
        onMouseEnter={() => setDimmerActive(true)}
        onMouseLeave={() => setDimmerActive(false)}
        style={{ display: 'inline-block', verticalAlign: 'top' }}
      >
        <Avatar user={user} />
        <Dimmer active={dimmerActive} inverted>
          <Button
            circular
            icon="photo"
            color="blue"
            size="medium"
            onClick={() => fileRef.current.click()}
          />
          {user.avatarFileName && (
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
      <Header as="h4">{user && user.username}</Header>
      <form>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileRef}
          onChange={handleChange}
        />
      </form>
    </>
  );
}
