import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';
import { Icon } from '@iconify/react/dist/iconify.js';

// last button of drive path which holds the menu
type DrivePathMenuButtonProps = {
  entryId: string;
  dirName: string;
};

const DrivePathMenuButton: React.FC<DrivePathMenuButtonProps> = ({ entryId, dirName }) => {
  const driveMenuItems: MenuItem[][] = [
    [
      {
        label: 'New folder',
        icon: <Icon icon='ic:outline-create-new-folder' />,
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
