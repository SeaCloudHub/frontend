import { phoneRegrex } from '../../utils/constants/phoneRegex.constant';
import * as Yup from 'yup';

export const signupSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(8).required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  phone: Yup.string().required('Phone is required').matches(phoneRegrex, 'Phone number is not valid'),
  address: Yup.string().required('Address is required'),
});

export const signupInitialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  address: '',
};
