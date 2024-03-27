export type AuthChangePasswordREQ = {
  password: string;
  confirmPassword: string;
};

export const changePasswordInitialValue: AuthChangePasswordREQ = {
  password: '',
  confirmPassword: '',
};
