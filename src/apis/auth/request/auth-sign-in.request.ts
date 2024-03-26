export type AuthSignInREQ = {
  email: string;
  password: string;
};

export const loginInitialValue: AuthSignInREQ = {
  email: '',
  password: '',
};
