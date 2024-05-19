import { NotificationContent, NotificationRESP } from './response/notification.response';

export const parseNotificationContent = (notificationResp: NotificationRESP): NotificationContent => {
  const parsedContent = JSON.parse(notificationResp.Content);
  const notification: NotificationContent = {
    Id: notificationResp.Uid,
    File: parsedContent.file,
    FileId: parsedContent.file_id,
    IsDir: parsedContent.is_dir,
    Role: parsedContent.role,
    OwnerAvatar: parsedContent.owner_id,
    OwnerName: parsedContent.owner_name,
    Status: notificationResp.Status,
  };

  return notification;
};
