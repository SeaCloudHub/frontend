import * as Yup from 'yup';

export const addUserSchema = Yup.object({
  first_name: Yup.string().required('First Name is required').min(5, 'First Name must be at least 5 characters long'),
  last_name: Yup.string().required('Last Name is required').min(5, 'Last Name must be at least 5 characters long'),
  email: Yup.string().required('Email is required').email('Invalid email format'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/,
      'Password must contain at least 8 characters, including at least one letter, one number, and one special character',
    )
    .required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});
