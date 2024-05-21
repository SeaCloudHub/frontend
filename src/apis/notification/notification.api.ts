import { notificationApi } from '@/helpers/http/config.http';
import { ListNotificationsRESP, NotificationContent, NotificationData } from './response/notification.response';
import { BaseResponse } from '@/utils/types/api-base-response.type';
import { parseNotificationContent } from './notification.service';

export const fetchNotifications = async (page: number = 1, limit: number = 10): Promise<NotificationData> => {
  const res = await notificationApi.get<BaseResponse<ListNotificationsRESP>>(`/users/notifications`, {
    params: { page, limit },
  });

  const { entries, pagination } = res.data.data;

  const notificationContents: NotificationContent[] = entries.map((entry) => {
    return parseNotificationContent(entry);
  });

  return { notifications: notificationContents, nextPage: pagination.next_page };
};

export const markAsViewed = async (notificationId: string): Promise<void> => {
  await notificationApi.patch(`/users/notifications`, { id_noti: notificationId });
};

export const markAllAsViewed = async (): Promise<void> => {
  await notificationApi.patch(`/users/marking-viewed-notifications`);
};
