import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';
import { Icon } from '@iconify/react/dist/iconify.js';

// last button of drive path which holds the menu
type DrivePathMenuButtonProps = {
  entryId: string;
  dirName: string;
  type?: 'MyDrive' | 'Shared' | 'Starred' | 'Trash';
};

const DrivePathMenuButton: React.FC<DrivePathMenuButtonProps> = ({ entryId, dirName, type }) => {
  const driveMenuItems: MenuItem[][] = [
    [
      {
        label: 'New folder',
        icon: <Icon icon='ic:outline-create-new-folder' />,
        action: () => {},
        isHidden: type !== 'MyDrive'
      },
    ],
    [
      {
        label: 'Download',
        icon: <Icon icon='ic:outline-file-download' />,
        action: () => {},
      },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: () => {},
        isHidden: type !== 'MyDrive'
      },
    ],
    [
      {
        label: 'Copy link',
        icon: <Icon icon='material-symbols:link' />,
        action: (text: string) => {},
      },
      {
        label: 'Share',
        icon: <Icon icon='lucide:user-plus' />,
        action: () => {},
      },
      {
        label: 'Move',
        icon: <Icon icon='mdi:folder-move-outline' />,
        action: () => {},
      },
      {
        label: 'Add to starred',
        icon: <Icon icon='material-symbols:star-outline' />,
        action: () => {},
      },
    ],
    [
      { label: 'File upload', icon: <Icon icon='ic:baseline-upload-file' />, action: () => {} },
      {
        label: 'Folder upload',
        icon: <Icon icon='mdi:folder-upload-outline' />,
        action: () => {},
      },
    ],
  ];

  return (
    <Dropdown
      button={
        <div className='my-0.5 flex h-9 cursor-pointer items-center rounded-full py-1 pl-4 pr-3 hover:bg-[#ededed]'>
          <div className='pb-1 text-2xl'>{dirName}</div>
          <Icon icon='mdi:caret-down' className='h-5 w-5' />
        </div>
      }
      items={driveMenuItems}
      left={false}
    />
  );
};

export default DrivePathMenuButton;
