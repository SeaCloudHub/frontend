export type AuthSignInRESP = {
  authority: string;
  accessToken: string;
  accessTokenExpireTime: string;
  refreshToken: string;
  refreshTokenExpireTime: string;
  firstLoginCheck: boolean;
};
