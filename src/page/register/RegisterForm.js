import * as React from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { useFormik } from 'formik';

import validationSchema from './validation-schema';
import { useErrorMessageRenderer } from '../../components';
import { RegisterService } from '../../service/RegisterService';

function RegisterForm(props) {
  const { onSuccess } = props;

  const onSubmitHandler = React.useCallback(
    values => {
      RegisterService.register(values).then(() => onSuccess?.());
    },
    [onSuccess]
  );

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDay: '',
      workplace: ''
    },
    validationSchema,
    onSubmit: onSubmitHandler
  });

  const errorMessageRender = useErrorMessageRenderer({ touched, errors });

  return (
    <Form onSubmit={handleSubmit} error={true} loading={isSubmitting}>
      <Form.Field>
        <label>Username*</label>
        <Input
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessageRender('username')}
      </Form.Field>

      <Form.Field>
        <label>Password*</label>
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessageRender('password')}
      </Form.Field>

      <Form.Group widths="equal">
        <Form.Field>
          <label>First name*</label>
          <Input
            placeholder="First name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('firstName')}
        </Form.Field>

        <Form.Field>
          <label>Last name*</label>
          <Input
            placeholder="Last name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('lastName')}
        </Form.Field>
      </Form.Group>

      <Form.Field>
        <label>Email*</label>
        <Input
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessageRender('email')}
      </Form.Field>

      <Form.Group widths={'equal'}>
        <Form.Field>
          <label>Birthday</label>
          <Input
            placeholder="Birthday"
            type="date"
            name="birthDay"
            value={values.birthDay}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('birthDay')}
        </Form.Field>
        <Form.Field>
          <label>Workplace</label>
          <Input
            placeholder="Workplace"
            name="workplace"
            value={values.workplace}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        {errorMessageRender('workplace')}
      </Form.Group>
      <Button primary type="submit">
        Submit
      </Button>
    </Form>
  );
}

// class BaseRegisterForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   isValid() {
//     return this.props.isValid && this.props.status.isValid;
//   }

//   ErrorMessage = FormErrorMessage.connectProps(this, FormErrorMessage);

//   handleChange(e) {
//     const { setStatus, status, handleChange } = this.props;
//     const fieldName = e.target.name;
//     setStatus({
//       ...status,
//       errors: {
//         ...status.errors,
//         [fieldName]: ''
//       }
//     });
//     handleChange(e);
//   }

//   render() {
//     const { values, handleBlur, handleSubmit, isSubmitting } = this.props;
//     const handleChange = this.handleChange;
//     return (
//       <Grid container>
//         <Grid.Row centered columns={1}>
//           <Grid.Column style={{ maxWidth: 560 }}>
//             <Header as={'h3'} attached={'top'} block>
//               Register
//             </Header>
//             <Segment attached>
//               <Form
//                 onSubmit={handleSubmit}
//                 error={!this.isValid()}
//                 loading={isSubmitting}
//               >
//                 <Form.Field>
//                   <label>Username*</label>
//                   <Input
//                     placeholder={'Username'}
//                     name={'username'}
//                     value={values.username}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   <this.ErrorMessage name={'username'} />
//                 </Form.Field>
//                 <Form.Field>
//                   <label>Password*</label>
//                   <Input
//                     placeholder={'Password'}
//                     name={'password'}
//                     type={'password'}
//                     value={values.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   <this.ErrorMessage name={'password'} />
//                 </Form.Field>
//                 <Form.Group widths={'equal'}>
//                   <Form.Field>
//                     <label>First name*</label>
//                     <Input
//                       placeholder={'First name'}
//                       name={'firstName'}
//                       value={values.firstName}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     <this.ErrorMessage name={'firstName'} />
//                   </Form.Field>
//                   <Form.Field>
//                     <label>Last name*</label>
//                     <Input
//                       placeholder={'Last name'}
//                       name={'lastName'}
//                       value={values.lastName}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     <this.ErrorMessage name={'lastName'} />
//                   </Form.Field>
//                 </Form.Group>
//                 <Form.Field>
//                   <label>Email*</label>
//                   <Input
//                     placeholder={'Email'}
//                     name={'email'}
//                     value={values.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                 </Form.Field>
//                 <this.ErrorMessage name={'email'} />
//                 <Form.Group widths={'equal'}>
//                   <Form.Field>
//                     <label>Birthday</label>
//                     <Input
//                       placeholder={'Birth day'}
//                       type={'date'}
//                       name={'birthDay'}
//                       value={values.birthDay}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                   </Form.Field>
//                   <Form.Field>
//                     <label>Workplace</label>
//                     <Input
//                       placeholder={'Workplace'}
//                       name={'workplace'}
//                       value={values.workplace}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                   </Form.Field>
//                 </Form.Group>
//                 <Button primary type={'submit'}>
//                   Submit
//                 </Button>
//               </Form>
//             </Segment>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     );
//   }
// }

// const RegisterForm = withFormik({
//   mapPropsToValues: props => {
//     const { initialUser } = props;
//     if (initialUser) {
//       return initialUser;
//     }
//     return {
//       username: '',
//       password: '',
//       firstName: '',
//       lastName: '',
//       email: '',
//       birthDay: '',
//       workplace: ''
//     };
//   },
//   mapPropsToStatus: () => {
//     return {
//       isValid: true,
//       errors: {}
//     };
//   },
//   handleSubmit: (values, bag) => {
//     UserService.register(values)
//       .then(value => {
//         bag.setSubmitting(false);
//         if (bag.props.onRegisterSuccess) bag.props.onRegisterSuccess(value);
//       })
//       .catch(error => {
//         const errors = {};
//         const errorList = error.response.data;
//         errorList.forEach(item => {
//           errors[item.field] = item.defaultMessage;
//         });
//         bag.setSubmitting(false);
//         bag.setStatus({
//           isValid: false,
//           errors
//         });
//       });
//   },
//   validationSchema
// })(BaseRegisterForm);

export { RegisterForm };
