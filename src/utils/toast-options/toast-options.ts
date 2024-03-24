import { ToastOptions } from 'react-toastify';

export const toastError = (closeTimeout = 1000): ToastOptions => ({
  hideProgressBar: true,
  autoClose: closeTimeout,
  position: 'bottom-left',
  type: 'error',
});

export const toastSuccess = (closeTimeout = 1000): ToastOptions => ({
  hideProgressBar: true,
  autoClose: closeTimeout,
  position: 'bottom-left',
  type: 'success',
});
