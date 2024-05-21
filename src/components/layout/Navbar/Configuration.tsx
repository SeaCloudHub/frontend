import ButtonIcon from '@/components/core/button/ButtonIcon';
import { ColorSchemeToggle } from '@/components/core/button/ColorSchemeToggle';
import { MenuItem } from '@/components/core/drop-down/Dropdown';
import MenuCore from '@/components/core/menu/MenuCore';
import { MenuItemCoreProps } from '@/components/core/menu/MenuItem';
import { useTheme } from '@/providers/theme-provider';
import { Badge, Popover, notification } from 'antd';
import Notification from './Notification';
import { useEffect, useState } from 'react';
import { pullNewNotification } from '@/apis/notification/notification.socket';
import { NotificationContent } from '@/apis/notification/response/notification.response';

const helpOptions: MenuItemCoreProps[] = [
  {
    icon: '',
    title: 'About us',
  },
  {
    icon: '',
    title: 'Help',
  },
];
const useSettingProviders = () => {
  const { setTheme } = useTheme();
  const settingMenu: MenuItem[][] = [
    [{ label: 'Keyboard', icon: null, action: () => {} }],
    [
      {
        label: 'Dark ',
        icon: null,
        action: () => {
          setTheme('dark');
        },
      },
      {
        label: 'Light ',
        icon: null,
        action: () => {
          setTheme('light');
        },
      },
    ],
  ];
  return { settingMenu };
};
const Configuration = () => {
  const { settingMenu } = useSettingProviders();
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [newNotification, setNewNotification] = useState<NotificationContent | null>(null);
  const [unviewedNotificationsCount, setUnviewedNotificationsCount] = useState(0);
  const [isClickMarkAllAsView, setIsClickMarkAllAsView] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const receiveNewNotification = () => {
    setHasNewNotification(false);
    return newNotification as NotificationContent;
  };

  const handleNewNotification = (newNotification: NotificationContent) => {
    setHasNewNotification(true);
    setNewNotification(newNotification);

    notification.open({
      message: 'New Notification',
      description: `${newNotification.OwnerName} has shared a file with you.`,
      icon: <ButtonIcon tooltip='Notification' size={'1.6rem'} icon='heroicons-outline:bell' />,
      duration: 2,
    });
  };

  useEffect(() => {
    pullNewNotification(handleNewNotification);
  }, []);

  const handleUnviewedNotificationsCount = (count: number) => {
    setUnviewedNotificationsCount(count);
  };

  return (
    <div className='ml-7 mr-5 flex items-center space-x-3'>
      <Popover
        content={Notification({
          receiveNewNotification,
          hasNewNotification,
          handleUnviewedNotificationsCount,
          isClickMarkAllAsView,
          handleHasNotification: setHasNotification,
        })}
        title={
          <div className='flex items-center justify-between'>
            <span>Notifications</span>

            {hasNotification && (
              <span className='cursor-pointer' onClick={() => setIsClickMarkAllAsView(true)}>
                Mark all as viewed
              </span>
            )}
          </div>
        }
        trigger='click'>
        <Badge count={unviewedNotificationsCount} size='small'>
          <ButtonIcon tooltip='Notification' size={'1.6rem'} icon='heroicons-outline:bell' />
        </Badge>
      </Popover>
      <MenuCore mix={false} menuItems={helpOptions}>
        <ButtonIcon tooltip='Help' size={'1.6rem'} icon='material-symbols:help-outline' />
      </MenuCore>
      {/* <MenuCore mix={false} menuItems={settingMenu}></MenuCore> */}
      {/* <CustomDropdown
        minWidth={false}
        button={<ButtonIcon tooltip='Setting' size={'1.6rem'} icon='uil:setting' />}
        items={settingMenu}
      /> */}
      <ColorSchemeToggle />
    </div>
  );
};

export default Configuration;
