import { SidebarItemType } from '@/utils/types/sidebar-item.type';

export const userSidebar: SidebarItemType[] = [
  {
    icon: 'material-symbols:priority-outline',
    title: 'Priority',
    link: '1',
    tooltip: 'Priority',
  },
  {
    icon: 'ri:drive-line',
    title: 'My Drive',
    link: '2',
    tooltip: 'My Drive',
  },
  {
    icon: 'ri:user-shared-line',
    title: 'Shared with me',
    link: '3',
    tooltip: 'Shared with me',
  },
  {
    icon: 'material-symbols:star-outline',
    title: 'Starred',
    link: '4',
    tooltip: 'Starred',
  },
  {
    icon: 'mdi:trash',
    title: 'Trash',
    link: '4',
    tooltip: 'Trash',
  },
  {
    icon: 'ic:outline-cloud',
    title: 'Memory',
    link: '5',
    tooltip: 'Memory',
  },
];

export const adminSidebar: SidebarItemType[] = [
  {
    icon: 'mage:dashboard-3-fill',
    title: 'Dashboard',
    link: '1',
    tooltip: 'Dashboard',
  },
  {
    icon: 'ph:user-fill',
    title: 'User management',
    link: '2',
    tooltip: 'User management',
  },
  {
    icon: 'material-symbols:folder',
    title: 'Storage management',
    link: '2',
    tooltip: 'Storage management',
  },
];
