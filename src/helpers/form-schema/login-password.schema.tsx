import * as Yup from 'yup';

export const loginPasswordSchema = Yup.object({
  // email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().min(8).required('Password is required'),
});

