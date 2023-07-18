import { useFormik } from 'formik';
import * as React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { ResetPasswordService } from '../../../services/ResetPasswordService';
import { ResetPasswordResponseDTO } from '../ResetPasswordResponseDTO';

export namespace ResetPasswordRequestForm {
  export interface Props {
    onSuccess?(response: ResetPasswordResponseDTO): void;
  }

  export interface Value {
    username: string;
  }
}

export const ResetPasswordRequestForm: React.FC<ResetPasswordRequestForm.Props> =
  (props) => {
    const { onSuccess } = props;

    const onSubmit = React.useCallback(
      (values: ResetPasswordRequestForm.Value) => {
        return ResetPasswordService.requestResetPassword(values.username).then(
          (response) => {
            onSuccess?.(response.data);
          }
        );
      },
      []
    );

    const { values, isSubmitting, handleChange, handleBlur, handleSubmit } =
      useFormik<ResetPasswordRequestForm.Value>({
        initialValues: {
          username: '',
        },
        onSubmit,
      });

    return (
      <Form
        className="clear-fix-container"
        loading={isSubmitting}
        onSubmit={handleSubmit}
      >
        <Form.Field>
          <label>Username</label>
          <Form.Input
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Field>
          <Button primary content="Submit" floated="right" />
        </Form.Field>
      </Form>
    );
  };
