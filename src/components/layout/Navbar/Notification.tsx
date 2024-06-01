import { fetchNotifications, markAllAsViewed, markAsViewed } from '@/apis/notification/notification.api';
import { NotificationContent, NotificationStatus } from '@/apis/notification/response/notification.response';
import { getFirstCharacters } from '@/utils/function/getFirstCharacter';
import { getRandomColor } from '@/utils/function/getRandomColor';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type NotificationProps = {
  hasNewNotification: boolean;
  receiveNewNotification: () => NotificationContent;
  handleUnviewedNotificationsCount: (count: number) => void;
  isClickMarkAllAsView: boolean;
  handleHasNotification: (hasNotification: boolean) => void;
};

const Notification = ({
  receiveNewNotification,
  hasNewNotification,
  handleUnviewedNotificationsCount,
  handleHasNotification,
  isClickMarkAllAsView,
}: NotificationProps) => {
  const [notifications, setNotifications] = useState<NotificationContent[]>([]);
  const [page, setPage] = useState(1);
  const [isFetch, setIsFetch] = useState(true);

  useEffect(() => {
    if (!isFetch) return;
    const fetchNotification = async () => {
      const { notifications: newNotifications, nextPage } = await fetchNotifications(page, 5);

      if (page == 1) {
        handleHasNotification(newNotifications.length > 0);
      }
      setNotifications((prevNotifications) => [...prevNotifications, ...newNotifications]);
      setPage(nextPage ?? 1);
    };

    fetchNotification();
    setIsFetch(false);
  }, [isFetch]);

  useEffect(() => {
    handleUnviewedNotificationsCount(calcUnviewedNotifications());
  }, [notifications]);

  useEffect(() => {
    if (hasNewNotification) {
      const newNotification = receiveNewNotification();

      if (page == 1) {
        handleHasNotification(true);
      }

      setNotifications((prevNotification) => [newNotification, ...prevNotification]);
      handleUnviewedNotificationsCount(calcUnviewedNotifications());
    }
  }, [hasNewNotification]);

  useEffect(() => {
    if (isClickMarkAllAsView) {
      handleMarkAllAsViewed();
    }
  }, [isClickMarkAllAsView]);

  const calcUnviewedNotifications = () => {
    const count = notifications.filter((notification) => notification.Status != NotificationStatus.Viewed).length;
    return count;
  };

  const handleClickViewNotification = (notiId: string) => {
    const newNotifications = notifications.map((notification) => {
      if (notification.Id === notiId) {
        return { ...notification, Status: NotificationStatus.Viewed };
      }
      return notification;
    });

    setNotifications(newNotifications);
    handleUnviewedNotificationsCount(calcUnviewedNotifications());
    markAsViewed(notiId);
  };

  const handleMarkAllAsViewed = () => {
    const newNotifications = notifications.map((notification) => {
      return { ...notification, Status: NotificationStatus.Viewed };
    });

    setNotifications(newNotifications);
    handleUnviewedNotificationsCount(0);
    markAllAsViewed();
  };

  return (
    <div className='max-h-[535px] max-w-[300px] overflow-y-auto'>
      {notifications.map((notification) => (
        <Link
          key={notification.Id}
          to={notification.IsDir ? `/drive/folder/${notification.FileId}` : `/drive/file/${notification.FileId}`}
          onClick={() => {
            notification.Status != NotificationStatus.Viewed && handleClickViewNotification(notification.Id);
          }}>
          <Card
            key={notification.Id}
            className={`mb-2 ${notification.Status != NotificationStatus.Viewed ? 'bg-gray-200 dark:bg-slate-800' : ''}`}>
            <div className='flex items-center space-x-2'>
              {notification.OwnerAvatar ? (
                <img
                  src={notification.OwnerAvatar}
                  className='h-10 w-10 rounded-full object-contain p-1'
                  draggable={false}
                  alt='avatar'
                />
              ) : (
                <div
                  className='flex h-10 w-10 items-center justify-center rounded-full'
                  style={{ backgroundColor: getRandomColor() }}>
                  <p className='statement-bold truncate'>{getFirstCharacters(notification.OwnerName)}</p>
                </div>
              )}
              <div className='flex-1'>
                <p>
                  {notification.OwnerName} has shared a {notification.IsDir ? 'folder' : 'file'} '{notification.File}' with you
                  with {notification.Role} role
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
      {page !== 1 && (
        <button
          onClick={() => {
            setIsFetch(true);
          }}
          className='cursor-pointer hover:bg-gray-300 hover:dark:bg-slate-800'>
          See more
        </button>
      )}
    </div>
  );
};

export default Notification;
