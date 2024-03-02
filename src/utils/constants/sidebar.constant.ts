import { SidebarItemType } from '@/utils/types/sidebar-item.type';

export const sidebarItems: SidebarItemType[] = [
  {
    icon: 'material-symbols:priority-outline',
    title: 'Priority',
    link: '1',
  },
  {
    icon: 'ri:drive-line',
    title: 'My Drive',
    link: '2',
  },
  {
    icon: 'ri:user-shared-line',
    title: 'Shared with me',
    link: '3',
  },
  {
    icon: 'material-symbols:star-outline',
    title: 'Starred',
    link: '4',
  },
  {
    icon: 'mdi:trash',
    title: 'Trash',
    link: '4',
  },
  { icon: 'ic:outline-cloud', title: 'Memory', link: '5' },
];
