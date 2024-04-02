export type AuthChangePasswordREQ = {
  old_password: string;
  new_password: string;
};

export const changePasswordInitialValue: { confirmPassword: string } & AuthChangePasswordREQ = {
  old_password: '',
  new_password: '',
  confirmPassword: '',
};
