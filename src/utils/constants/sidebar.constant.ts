import { SidebarItemType } from '@/utils/types/sidebar-item.type';
import {
  ADMIN_DASHBOARD,
  ADMIN_STORAGE_MANAGEMENT,
  ADMIN_USER_MANAGEMENT,
  CUSTOMER_MEMORY,
  CUSTOMER_MY_DRIVE,
  CUSTOMER_PRIORITY,
  CUSTOMER_SHARED,
  CUSTOMER_STARRED,
  CUSTOMER_TRASH,
} from './router.constant';

export const userSidebar: SidebarItemType[] = [
  {
    icon: 'material-symbols:priority-outline',
    title: 'Priority',
    link: CUSTOMER_PRIORITY,
    tooltip: 'Priority',
  },
  {
    icon: 'ri:drive-line',
    title: 'My Drive',
    link: CUSTOMER_MY_DRIVE,
    tooltip: 'My Drive',
  },
  {
    icon: 'ri:user-shared-line',
    title: 'Shared with me',
    link: CUSTOMER_SHARED,
    tooltip: 'Shared with me',
  },
  {
    icon: 'material-symbols:star-outline',
    title: 'Starred',
    link: CUSTOMER_STARRED,
    tooltip: 'Starred',
  },
  {
    icon: 'mdi:trash',
    title: 'Trash',
    link: CUSTOMER_TRASH,
    tooltip: 'Trash',
  },
  {
    icon: 'ic:outline-cloud',
    title: 'Memory',
    link: CUSTOMER_MEMORY,
    tooltip: 'Memory',
  },
];

export const adminSidebar: SidebarItemType[] = [
  {
    icon: 'mage:dashboard-3-fill',
    title: 'Dashboard',
    link: ADMIN_DASHBOARD,
    tooltip: 'Dashboard',
  },
  {
    icon: 'ph:user-fill',
    title: 'User management',
    link: ADMIN_USER_MANAGEMENT,
    tooltip: 'User management',
  },
  {
    icon: 'material-symbols:folder',
    title: 'Storage management',
    link: ADMIN_STORAGE_MANAGEMENT,
    tooltip: 'Storage management',
  },
];
