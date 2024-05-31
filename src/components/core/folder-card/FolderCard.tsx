import { RenameREQ } from '@/apis/drive/drive.request';
import { useDrawer, useEntries, useSelected } from '@/store/my-drive/myDrive.store';
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
import { LocalEntry, SuggestedEntry, useStarEntryMutation, useUnstarEntryMutation } from '@/hooks/drive.hooks';
import { isPermission } from '@/utils/function/permisstion.function';
import { useNavigate } from 'react-router-dom';
import { Star } from '@mui/icons-material';

type FolderCardProps = {
  title: string;
  icon: React.ReactNode;
  id: string;
  onDoubleClick?: () => void;
  onClick?: () => void;
  isSelected?: boolean;
  parent?: 'priority' | 'my-drive' | 'shared' | 'trash' | 'starred';
  dir: { id: string; name: string };
  userRoles?: ('owner' | 'editor' | 'viewer')[];
  is_starred: boolean;
};

const FolderCard: React.FC<FolderCardProps> = ({ title, icon, id, onClick, isSelected, parent, dir, userRoles, is_starred }) => {
  const setDrawerOpen = useDrawer((state) => state.openDrawer);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [type, setType] = useState<'move' | 'share' | 'rename' | 'move to trash' | null>();
  const { rootId } = useStorageStore();
  const navigate = useNavigate();
  const { listSuggestedEntries, setListSuggestedEntries } = useEntries();
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
        isHidden: isPermission(userRoles) <= 1,
      },
    ],
    [
      {
        label: 'Copy link',
        icon: <Icon icon='material-symbols:link' />,
        action: () => {
          const link = `${window.location.origin}/folder/${id}`;
          CopyToClipboard(link);
        },
      },
      {
        label: 'Share',
        icon: <Icon icon='lucide:user-plus' />,
        action: () => {
          setType('share');
          setIsPopUpOpen(true);
        },
        isHidden: isPermission(userRoles) <= 1,
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
        isHidden: isPermission(userRoles) <= 1,
      },
      ...(is_starred
        ? [
            {
              label: 'Remove from starred',
              icon: <Icon icon='mdi:star-off-outline' />,
              action: () => {
                unstarEntryMutation.mutate(
                  { file_ids: [id] },
                  {
                    onSuccess: () => {
                      const newState = listSuggestedEntries.map((entry: SuggestedEntry) => {
                        if (entry.id === id) {
                          return { ...entry, is_starred: false };
                        }
                        return entry;
                      });
                      setListSuggestedEntries(newState);
                    },
                  },
                );
              },
            },
          ]
        : [
            {
              label: 'Add to starred',
              icon: <Icon icon='material-symbols:star-outline' />,
              action: () => {
                starEntryMutation.mutate(
                  { file_ids: [id] },
                  {
                    onSuccess: () => {
                      const newState = listSuggestedEntries.map((entry: SuggestedEntry) => {
                        if (entry.id === id) {
                          return { ...entry, is_starred: true };
                        }
                        return entry;
                      });
                      setListSuggestedEntries(newState);
                    },
                  },
                );
              },
            },
          ]),
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
        isHidden: isPermission(userRoles) <= 1,
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
    setArrSelected(
      arrSelected.some((item) => item.id === id && item.isDir === true)
        ? arrSelected.filter((item) => item.id !== id)
        : [...arrSelected, { id, isDir: true, userRoles }],
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      handleCtrlClick();
      return;
    }
    onClick && onClick();
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setArrSelected([]);

    isPermission(userRoles) >= 1 && isPermission(userRoles) < 3 && navigate(`/drive/folder/${id}`);
    //my-drive
    isPermission(userRoles) === 3 && navigate(`/drive/my-drive/dir/${id}`);
  };

  return (
    <div
      className={classNames(
        'folder-card flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-3 shadow-sm',
        isSelected
          ? 'bg-[#c2e7ff] dark:bg-blue-900 dark:text-white'
          : 'bg-[#f0f4f9] transition-all hover:bg-[#dfe3e7] dark:bg-slate-600 dark:text-white dark:hover:bg-slate-700',
      )}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}>
      <div className='flex max-w-[calc(100%-1.5rem)] items-center space-x-4'>
        <div className='h-6 w-6 min-w-fit'>{icon}</div>
        <Tooltip title={title}>
          <div className='select-none truncate text-sm font-medium'>{title}</div>
        </Tooltip>
        {is_starred && <Star />}
      </div>
      <div
        className='h-6 w-6 rounded-full p-1 hover:bg-slate-300 dark:hover:bg-slate-500'
        onDoubleClick={(e) => e.stopPropagation()}>
        <CustomDropdown button={<BsThreeDotsVertical className='dark:hover:text-white' />} items={folderOps} />
      </div>

      {type === 'move' && (
        <MovePopUp
          open={isPopUpOpen}
          handleClose={() => setIsPopUpOpen(false)}
          title={title}
          location={dir}
          ids={arrSelected.map((item) => item.id) || [id]}
        />
      )}
      {type === 'share' && <SharePopUp fileId={id} open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} />}
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
