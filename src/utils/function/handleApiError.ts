import { AxiosError } from 'axios';
export function handleError(error: AxiosError | string) {
  if (typeof error === 'string') {
    return;
  }
  if (typeof error?.message === 'string' && !error.isAxiosError) {
    return;
  }
  if (!error.isAxiosError) {
    return;
  }
  if (error.response) {
    const data: any = error.response.data;
    console.log(error.response.data);
    if (Array.isArray(data?.data)) {
      return;
    }
    if (typeof data?.message === 'string') {
      return;
    }
  }
  if (error.message) {
    return;
  }
}
