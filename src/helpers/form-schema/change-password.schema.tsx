import * as Yup from 'yup';

export const changePasswordSchema = Yup.object({
  old_password: Yup.string().required('Old password is required'),
  new_password: Yup.string().matches(
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/,
    'Password must contain at least 8 characters, including at least one letter, one number, and one special character',
  ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('new_password')], 'Passwords must match')
    .required('Confirm password is required'),
});
