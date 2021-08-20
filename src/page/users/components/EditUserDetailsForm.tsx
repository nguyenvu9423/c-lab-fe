// import { Button, Form, Grid, Header, Input, Segment } from 'semantic-ui-react';
// import * as React from 'react';
// import * as yup from 'yup';
// import { FormErrorMessage } from '../../common/FormErrorMessage';
// import { withFormik } from 'formik';

// class BaseEditUserDetailsForm extends React.Component {
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
//         [fieldName]: '',
//       },
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

// const EditUserDetailsForm = withFormik({
//   mapPropsToValues: (props) => {
//     const { initialUser } = props;
//     if (initialUser) {
//       return {
//         firstName: initialUser.firstName,
//         lastName: initialUser.lastName,
//         email: initialUser.email,
//         birthDay: initialUser.birthDay,
//         workplace: initialUser.workplace,
//       };
//     }
//     return {
//       firstName: '',
//       lastName: '',
//       email: '',
//       birthDay: '',
//       workplace: '',
//     };
//   },
//   mapPropsToStatus: () => {
//     return {
//       isValid: true,
//       errors: {},
//     };
//   },
//   handleSubmit: (values, bag) => {
//     const { props } = bag;
//     props.onSubmit(values, bag);
//   },
//   validationSchema: yup.object().shape({
//     firstName: yup
//       .string()
//       .required('First name is required')
//       .min(2, 'First name should be at least 2 characters')
//       .max(24, 'First name should be at most 64 characters'),
//     lastName: yup
//       .string()
//       .required('Last name is required')
//       .min(2, 'Last name should be at least 2 characters')
//       .max(24, 'Last name should be at most 64 characters'),
//     email: yup
//       .string()
//       .required('Email is required')
//       .email('Email is not valid'),
//   }),
// })(BaseEditUserDetailsForm);

// export { EditUserDetailsForm };
