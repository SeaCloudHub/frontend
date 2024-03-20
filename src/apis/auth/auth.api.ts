import { HTTP_HEADER } from '@/utils/constants/http.constant';
import { api } from '../../helpers/http/config.http';
import { AuthSignInREQ } from './request/auth-sign-in.request';
import { AuthSignInRESP } from './response/auth.sign-in.response';

export const signinApi = (body: AuthSignInREQ) => api.post<AuthSignInRESP>('/user', body
{ headers:{...HTTP_HEADER.FORM_DATA}});

