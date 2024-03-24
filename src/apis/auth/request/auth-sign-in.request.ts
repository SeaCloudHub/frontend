export type AuthSignInREQ = {
  email: string;
  password: string;
};

export const loginPasswordInitialValues: AuthSignInREQ = {
  email: 'phannhattrieu012@gmail.com',
  password: '12345678',
};
