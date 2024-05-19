import { PageInfoRESP } from '@/apis/drive/drive.response';

export enum NotificationStatus {
  Ready = 'ready',
  Processing = 'processing',
  Failure = 'failure',
  Success = 'success',
  Pending = 'pending',
  Viewed = 'viewed',
}

export type NotificationContent = {
  Id: string;
  File: string;
  FileId: string;
  IsDir: boolean;
  Role: string;
  OwnerAvatar: string;
  OwnerName: string;
  Status: NotificationStatus;
};

export type NotificationRESP = {
  Uid: string;
  From: string;
  To: string;
  Content: string;
  Status: NotificationStatus;
};

export type ListNotificationsRESP = {
  entries: NotificationRESP[];
  pagination: PageInfoRESP;
};

export type NotificationData = {
  notifications: NotificationContent[];
  nextPage: number | null;
};
