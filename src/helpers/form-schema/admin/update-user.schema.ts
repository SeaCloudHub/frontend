import * as Yup from 'yup';

export const updateUserSchema = Yup.object({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
});
