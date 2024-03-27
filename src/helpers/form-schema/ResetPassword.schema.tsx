import * as Yup from 'yup';

export const resetPasswordSchema = Yup.object({
  password: Yup.string().required('Password is required'),
});

export const confirmPasswordSchema = Yup.object({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
});
