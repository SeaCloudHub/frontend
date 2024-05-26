import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getLocalStorage } from '../../utils/function/auth.function';
import { getCookie } from '@/utils/function/cookie.function';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_ENDPOINT,
  headers: {},
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    const token = getCookie('token') || null;
    if (!token) return config;
    return { ...config, headers: { Authorization: `Bearer ${token}` } };
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

export const notificationApi = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_SERVICE_ENDPOINT + '/api',
  headers: {},
});

notificationApi.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    const token = getCookie('token') || null;
    // const token = JSON.parse(getLocalStorage('sessionStore') as string)?.state?.token || null;
    if (!token) return config;
    return { ...config, headers: { Authorization: `Bearer ${token}` } };
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);
