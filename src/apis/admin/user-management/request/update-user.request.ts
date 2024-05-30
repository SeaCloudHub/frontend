export type AdminUpdateUserREQ = {
  avatar_url: string;
  first_name: string;
  last_name: string;
};

export const updateUserInitValue = {
  first_name: '',
  last_name: '',
};
