export type AddUserREQ = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar_url: string;
};

export const addUserInitValue: { confirm_password: string } & AddUserREQ = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  avatar_url: '',
};
