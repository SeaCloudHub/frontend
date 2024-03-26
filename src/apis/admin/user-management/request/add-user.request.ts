export type AddUserREQ = {
  // name: string;
  email: string;
  password: string;
};

export const addUserInitValue: { confirmPassword: string } & AddUserREQ = {
  // name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
