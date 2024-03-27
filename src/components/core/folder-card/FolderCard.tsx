import Dropdown, { MenuItem } from '../drop-down/Dropdown';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useDrawer } from '@/pages/user/my-drive/MyDrive';

interface FolderCardProps {
  title: string;
  icon: React.ReactNode;
  id: string;
}

const FolderCard: React.FC<FolderCardProps> = ({ title, icon, id }) => {
  const setDrawerOpen = useDrawer((state) => state.setDrawerOpen);
  const folderOps: MenuItem[][] = [
    [
      { label: 'Download', icon: <Icon icon='ic:outline-file-download' />, action: () => {} },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: () => {},
      },
    ],
    [
      { label: 'Copy link', icon: <Icon icon='material-symbols:link' />, action: () => {} },
      { label: 'Share', icon: <Icon icon='lucide:user-plus' />, action: () => {} },
    ],
    [
      { label: 'Move', icon: <Icon icon='mdi:folder-move-outline' />, action: () => {} },
      {
        label: 'Add shortcut',
        icon: <Icon icon='material-symbols:add-to-drive' />,
        action: () => {},
      },
      {
        label: 'Add to starred',
        icon: <Icon icon='material-symbols:star-outline' />,
        action: () => {},
      },
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon='mdi:information-outline' />,
        action: setDrawerOpen,
      },
      { label: 'Activity', icon: <Icon icon='mdi:graph-line-variant' />, action: () => {} },
    ],
    [{ label: 'Move to trash', icon: <Icon icon='fa:trash-o' />, action: () => {} }],
  ];

  return (
    <div className='flex h-full w-full flex-col items-center justify-center rounded-xl bg-surfaceContainerLow px-2 shadow-sm hover:bg-surfaceDim'>
      <div className='flex w-full items-center justify-between px-1 py-3'>
        <div className='flex items-center space-x-4'>
          <div className='h-6 w-6'>{icon}</div>
          <div className='... truncate text-sm font-medium'>{title}</div>
        </div>
        <Dropdown
          button={<BsThreeDotsVertical className='h-6 w-6 rounded-full p-1 hover:bg-slate-300' />}
          items={folderOps}
          left={true}
        />
      </div>
    </div>
  );
};

export default FolderCard;
