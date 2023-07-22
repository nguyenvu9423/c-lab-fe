import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title should be at last 3 characters'),
  content: yup.string().required('Content is required'),
});
