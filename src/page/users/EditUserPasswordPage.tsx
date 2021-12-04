import * as React from 'react';

import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { match, useHistory } from 'react-router';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { EditUserPasswordForm } from '../../domains/user';
import { ValidationException } from '../../exception';
import { UserService } from '../../service/UserService';
import { addToast } from '../../store/actions';
import { AuthenticationSelectors } from '../../store/selectors';
import { PageErrorMessage } from '../shared';
import { useScrollToTop } from '../../common/hooks';

export const EditUserPasswordPage: React.FC<{
  match: match<{ username: string }>;
}> = (props) => {
  const {
    match: { params },
  } = props;
  useScrollToTop();

  const history = useHistory();
  const dispatch = useDispatch();
  const username = useSelector(AuthenticationSelectors.username());

  const handleSubmit = React.useCallback(
    (
      value: EditUserPasswordForm.Value,
      helpers: FormikHelpers<EditUserPasswordForm.Value>
    ) => {
      return UserService.updatePassword(params.username, {
        newPassword: value.newPassword,
        oldPassword: value.oldPassword,
      })
        .then(() => {
          dispatch(
            addToast({
              header: 'Đổi mật khẩu thành công',
              content: 'Mật khẩu của bạn đã được thanh đổi',
              duration: 2500,
              status: 'positive',
            })
          );
          history.push(`/users/${username}`);
        })
        .catch((e) => {
          if (ValidationException.isInstance(e)) {
            helpers.setErrors(ValidationException.convertToFormikErrors(e));
          }
        });
    },
    [dispatch, params.username]
  );

  if (username !== params.username) {
    return (
      <PageErrorMessage message="Bạn không có quyền truy cập vào trang này" />
    );
  }

  return (
    <Grid container>
      <Grid.Row centered columns={1}>
        <Grid.Column style={{ maxWidth: 560 }}>
          <Segment clearing>
            <Header as="h2">Đổi mật khẩu</Header>
            <EditUserPasswordForm
              onCancel={() => {
                history.push(`/users/${username}`);
              }}
              onSubmit={handleSubmit}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
