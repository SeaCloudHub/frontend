import Dropdown, { MenuItem, classNames } from '../drop-down/Dropdown';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { useRef, useState } from 'react';
import SharePopUp from '../pop-up/SharePopUp';
import MovePopUp from '../pop-up/MovePopUp';
import { Tooltip } from '@mui/material';
import CustomDropdown from '../drop-down/CustomDropdown';
import RenamePopUp from '../pop-up/RenamePopUp';
import { useRenameMutation } from '@/hooks/drive.hooks';
import { RenameREQ } from '@/apis/drive/drive.request';

interface FolderCardProps {
  title: string;
  icon: React.ReactNode;
  id: string;
  onDoubleClick?: () => void;
  onClick?: () => void;
  isSelected?: boolean;
}

const FolderCard: React.FC<FolderCardProps> = ({ title, icon, id, onDoubleClick, onClick, isSelected }) => {
  const setDrawerOpen = useDrawer((state) => state.openDrawer);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [type, setType] = useState<'move' | 'share' | 'rename' | null>();

  const folderOps: MenuItem[][] = [
    [
      { label: 'Download', icon: <Icon icon='ic:outline-file-download' />, action: () => {} },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: (body: RenameREQ) => {
          setType('rename');
          setIsPopUpOpen(true);
        },
      },
    ],
    [
      {
        label: 'Copy link',
        icon: <Icon icon='material-symbols:link' />,
        action: (text: string) => {
          CopyToClipboard(text);
        },
      },
      {
        label: 'Share',
        icon: <Icon icon='lucide:user-plus' />,
        action: () => {
          setType('share');
          setIsPopUpOpen(true);
        },
      },
    ],
    [
      {
        label: 'Move',
        icon: <Icon icon='mdi:folder-move-outline' />,
        action: () => {
          setType('move');
          setIsPopUpOpen(true);
        },
      },
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
        action: () => setDrawerOpen(id),
      },
      { label: 'Activity', icon: <Icon icon='mdi:graph-line-variant' />, action: () => {} },
    ],
    [{ label: 'Move to trash', icon: <Icon icon='fa:trash-o' />, action: () => {} }],
  ];

  return (
    <div
      className={classNames(
        'flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-3 shadow-sm',
        isSelected ? 'bg-[#c2e7ff]' : 'bg-[#f0f4f9] hover:bg-[#dfe3e7]',
      )}
      onDoubleClick={onDoubleClick}
      onClick={onClick}>
      <div className='flex max-w-[calc(100%-24px)] items-center space-x-4'>
        <div className='h-6 w-6 min-w-fit'>{icon}</div>
        <Tooltip title={title}>
          <div className='truncate text-sm font-medium'>{title}</div>
        </Tooltip>
      </div>
      <CustomDropdown
        button={<BsThreeDotsVertical className='h-6 w-6 rounded-full p-1 hover:bg-slate-300' />}
        items={folderOps}
      />
      {type === 'move' && (
        <MovePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} location={'My drive'} />
      )}
      {type === 'share' && <SharePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} />}
      {type === 'rename' && (
        <RenamePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} name={title} id={id} onChanged={onChanged} />
      )}
    </div>
  );
};

export default FolderCard;
