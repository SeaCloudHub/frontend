import { SidebarItemType } from '@/utils/types/sidebar-item.type';
import {
  ADMIN_HOME,
  ADMIN_STORAGE_MANAGEMENT,
  ADMIN_USER_MANAGEMENT,
  DRIVE_HOME,
  DRIVE_MEMORY,
  DRIVE_MY_DRIVE,
  DRIVE_SHARED,
  DRIVE_STARRED,
  DRIVE_TRASH,
} from './router.constant';

export const userSidebar: SidebarItemType[] = [
  {
    icon: 'tabler:home',
    title: 'Home',
    link: DRIVE_HOME,
    tooltip: 'Home',
  },
  {
    icon: 'ri:drive-line',
    title: 'My Drive',
    link: DRIVE_MY_DRIVE,
    tooltip: 'My Drive',
  },
  {
    icon: 'ri:user-shared-line',
    title: 'Shared with me',
    link: DRIVE_SHARED,
    tooltip: 'Shared with me',
  },
  {
    icon: 'material-symbols:star-outline',
    title: 'Starred',
    link: DRIVE_STARRED,
    tooltip: 'Starred',
  },
  {
    icon: 'ph:trash',
    title: 'Trash',
    link: DRIVE_TRASH,
    tooltip: 'Trash',
  },
  {
    icon: 'ic:outline-cloud',
    title: 'Memory',
    link: DRIVE_MEMORY,
    tooltip: 'Memory',
  },
];

export const adminSidebar: SidebarItemType[] = [
  {
    icon: 'material-symbols-light:dashboard-outline',
    title: 'Dashboard',
    link: ADMIN_HOME,
    tooltip: 'Dashboard',
  },
  {
    icon: 'solar:user-outline',
    title: 'Users Management',
    link: ADMIN_USER_MANAGEMENT,
    tooltip: 'User management',
  },
  {
    icon: 'iconamoon:folder-thin',
    title: 'Storage Management',
    link: ADMIN_STORAGE_MANAGEMENT,
    tooltip: 'Storage management',
  },
];
