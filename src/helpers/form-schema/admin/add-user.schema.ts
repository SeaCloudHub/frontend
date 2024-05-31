import * as Yup from 'yup';

export const addUserSchema = Yup.object({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required').email('Invalid email format'),
});
