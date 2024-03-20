import * as Yup from 'yup';

export const resetPasswordSchema = Yup.object({
  password: Yup.string().min(8).required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const resetPasswordInitialValues = { password: '', confirmPassword: '' };
