import { RenameREQ } from '@/apis/drive/drive.request';
import { useDrawer, useSelected } from '@/store/my-drive/myDrive.store';
import { useStorageStore } from '@/store/storage/storage.store';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CustomDropdown from '../drop-down/CustomDropdown';
import { MenuItem, classNames } from '../drop-down/Dropdown';
import DeleteTempPopUp from '../pop-up/DeleteTempPopUp';
import MovePopUp from '../pop-up/MovePopUp';
import RenamePopUp from '../pop-up/RenamePopUp';
import SharePopUp from '../pop-up/SharePopUp';
import { useStarEntryMutation, useUnstarEntryMutation } from '@/hooks/drive.hooks';

interface FolderCardProps {
  title: string;
  icon: React.ReactNode;
  id: string;
  onDoubleClick?: () => void;
  onClick?: () => void;
  isSelected?: boolean;
  parent?: 'priority' | 'my-drive' | 'shared' | 'trash' | 'starred';
  dir: { id: string; name: string };
  // setArrSelected?: Dispatch<SetStateAction<string[]>>;
}

const FolderCard: React.FC<FolderCardProps> = ({ title, icon, id, onDoubleClick, onClick, isSelected, parent, dir }) => {
  const setDrawerOpen = useDrawer((state) => state.openDrawer);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [type, setType] = useState<'move' | 'share' | 'rename' | 'move to trash' | null>();
  const { rootId } = useStorageStore();
  const { arrSelected, setArrSelected } = useSelected();
  const [result, setResult] = useState(false);
  const starEntryMutation = useStarEntryMutation();
  const unstarEntryMutation = useUnstarEntryMutation();

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
        label: parent !== 'starred' ? 'Add to starred' : 'Remove from starred',
        icon: parent !== 'starred' ? <Icon icon='material-symbols:star-outline' /> : <Icon icon='mdi:star-off-outline' />,
        action: () => {
          parent !== 'starred' ? starEntryMutation.mutate({ id }) : unstarEntryMutation.mutate({ id });
        },
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
    [
      {
        label: 'Move to trash',
        icon: <Icon icon='fa:trash-o' />,
        action: () => {
          setType('move to trash');
          setIsPopUpOpen(true);
        },
      },
    ],
  ];

  useEffect(() => {
    if (result) {
      setArrSelected([]);
      setResult(false);
    }
  }, [result, setArrSelected]);

  const handleCtrlClick = () => {
    if (setArrSelected) {
      // setArrSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
      setArrSelected(arrSelected.includes(id) ? arrSelected.filter((item) => item !== id) : [...arrSelected, id]);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      handleCtrlClick();
      return;
    }
    onClick && onClick();
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      handleCtrlClick();
      return;
    }
    setArrSelected([]);
    onDoubleClick && onDoubleClick();
  };

  return (
    <div
      className={classNames(
        'folder-card flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-3 shadow-sm',
        isSelected
          ? 'bg-[#c2e7ff] dark:bg-blue-900 dark:text-white'
          : 'bg-[#f0f4f9] hover:bg-[#dfe3e7] dark:bg-slate-600 dark:text-white dark:hover:bg-blue-950',
      )}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}>
      <div className='flex max-w-[calc(100%-1.5rem)] items-center space-x-4'>
        <div className='h-6 w-6 min-w-fit'>{icon}</div>
        <Tooltip title={title}>
          <div className='select-none truncate text-sm font-medium'>{title}</div>
        </Tooltip>
      </div>
      <div className='h-6 w-6 rounded-full p-1 hover:bg-slate-300 dark:hover:bg-slate-800'>
        <CustomDropdown button={<BsThreeDotsVertical />} items={folderOps} />
      </div>

      {type === 'move' && <MovePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} location={dir} />}
      {type === 'share' && <SharePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} />}
      {type === 'rename' && <RenamePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} name={title} id={id} />}
      {type === 'move to trash' && (
        <DeleteTempPopUp
          open={isPopUpOpen}
          handleClose={() => setIsPopUpOpen(false)}
          title={title}
          id={rootId}
          source_ids={[id]}
          setResult={setResult}
        />
      )}
    </div>
  );
};

export default FolderCard;
