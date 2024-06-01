import { getLocalStorage } from '@/utils/function/auth.function';
import { getCookie } from '@/utils/function/cookie.function';
const ENDPOINT = import.meta.env.VITE_NOTIFICATION_SERVICE_ENDPOINT;

import io from 'socket.io-client';

let socket;

export const initializeSocket = (token) => {
  if (!socket) {
    socket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      // console.log('Client connected');

      // Emit token
      socket.emit('authenticate', token);
    });

    socket.on('test', (msg) => console.log(msg));
    socket.on('reply', (msg) => console.log(msg));

    socket.on('disconnect', () => {
      // console.log('Socket is disconnected');
    });

    socket.on('authenticated', (data) => {
      // console.log('data: ', data);
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    const token = getCookie('token') || null;
    // const token = JSON.parse(getLocalStorage('sessionStore')).state.token;

    if (!token) {
      // throw new Error('Token not found');
    }

    initializeSocket(token);
  }
  return socket;
};
