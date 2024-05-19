import { getSocket } from '@/helpers/socket/socket.io';
import { parseNotificationContent } from './notification.service';
import { NotificationContent, NotificationRESP } from './response/notification.response';

export const pullNewNotification = (callback: (newNotification: NotificationContent) => void) => {
  const socket = getSocket();

  socket.on('notification', (data: NotificationRESP) => {
    const newNotification = parseNotificationContent(data);
    callback(newNotification);
  });
};
