import * as Yup from 'yup';

export const emailSchema = Yup.object({
  email: Yup.string().email('Email is invalid').required('Email is required'),
});

export const passwordSchema = Yup.object({
  password: Yup.string(),
  // .matches(
  //   /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/,
  //   'Password must contain at least 8 characters, including at least one letter, one number, and one special character',
  // )
  // .required('Password is required'),
});
