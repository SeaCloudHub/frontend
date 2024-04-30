import Dropdown, { MenuItem } from '@/components/core/drop-down/Dropdown';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Tooltip } from '@mui/material';
import { useDrawer } from '@/store/my-drive/myDrive.store';
import { LocalEntry } from '@/hooks/drive.hooks';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import SharePopUp from '@/components/core/pop-up/SharePopUp';
import MovePopUp from '@/components/core/pop-up/MovePopUp';
import RenamePopUp from '@/components/core/pop-up/RenamePopUp';
import DeletePopUp from '@/components/core/pop-up/DeletePopUp';
import { FormatDateStrToDDMMYYYY } from '@/utils/function/formatDate.function';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_MY_DRIVE, CUSTOMER_PRIORITY, CUSTOMER_SHARED_DIR } from '@/utils/constants/router.constant';

export const DataRow: React.FC<LocalEntry> = ({ id, isDir, title, icon, lastModified, owner, size, onDoubleClick, parent }) => {
  const setDrawerOpen = useDrawer((state) => state.openDrawer);
  const [type, setType] = React.useState<'move' | 'share' | 'rename' | null>(null);
  const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);
  const navigate = useNavigate();

  const fileOps = [
    [{ label: 'Preview', icon: <Icon icon='material-symbols:visibility' /> }],
    [
      { label: 'Download', icon: <Icon icon='ic:outline-file-download' /> },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: () => {
          console.log('rename');
          setType('rename');
          setIsPopUpOpen(true);
        },
      },
      {
        label: 'Make a copy',
        icon: <Icon icon='material-symbols:content-copy-outline' />,
      },
    ],
    [
      { label: 'Copy link', icon: <Icon icon='material-symbols:link' /> },
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
      },
      {
        label: 'Add to starred',
        icon: <Icon icon='material-symbols:star-outline' />,
      },
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon='mdi:information-outline' />,
        action: () => setDrawerOpen(id),
      },
      { label: 'Activity', icon: <Icon icon='mdi:graph-line-variant' /> },
      { label: 'Lock', icon: <Icon icon='mdi:lock-outline' /> },
    ],
    [{ label: 'Move to trash', icon: <Icon icon='fa:trash-o' /> }],
  ];

  const folderOps = [
    [
      { label: 'Download', icon: <Icon icon='ic:outline-file-download' /> },
      {
        label: 'Rename',
        icon: <Icon icon='ic:round-drive-file-rename-outline' />,
        action: () => {
          setType('rename');
          setIsPopUpOpen(true);
        },
      },
    ],
    [
      { label: 'Copy link', icon: <Icon icon='material-symbols:link' /> },
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
          console.log('[FileCard] add shortcut ' + id);
          setType('move');
          setIsPopUpOpen(true);
        },
      },
      {
        label: 'Add shortcut',
        icon: <Icon icon='material-symbols:add-to-drive' />,
      },
      {
        label: 'Add to starred',
        icon: <Icon icon='material-symbols:star-outline' />,
      },
    ],
    [
      {
        label: 'Detail',
        icon: <Icon icon='mdi:information-outline' />,
        action: () => setDrawerOpen(id),
      },
      { label: 'Activity', icon: <Icon icon='mdi:graph-line-variant' /> },
    ],
    [{ label: 'Move to trash', icon: <Icon icon='fa:trash-o' /> }],
  ];

  const menuItemsTrash: MenuItem[] = [
    {
      label: 'Restore',
      icon: <Icon icon='mdi:restore' />,
      action: () => {
        console.log('[FileCard] Restore ' + id);
      },
    },
    {
      label: 'Delete permanently',
      icon: <Icon icon='fa:trash-o' />,
      action: () => {
        console.log('[FileCard] Delete permanently ' + id);
        setIsPopUpOpen(true);
      },
    },
  ];

  // const [showTools, setShowTools] = useState(false);
  return (
    <div
      className='flex h-8 cursor-pointer items-center space-x-3 border-b border-b-[#dadce0] hover:bg-[#f0f1f1]'
      onDoubleClick={() => {
        if (!isDir) return;
        parent === 'shared' ? navigate(`${CUSTOMER_SHARED_DIR}/dir/${id}`) : navigate(`${CUSTOMER_MY_DRIVE}/dir/${id}`);
      }}>
      <div className='flex shrink grow basis-[304px] items-center text-sm font-medium'>
        <div className='px-4'>
          <div className='h-6 w-6'>{icon}</div>
        </div>
        <Tooltip title={title}>
          <div className='line-clamp-1 w-96 max-2xl:w-72 max-lg:w-48 max-md:w-36 max-sm:w-28 max-xs:w-20'>{title}</div>
        </Tooltip>
      </div>
      <div className='shrink-0 grow-0 basis-[215px] text-sm font-medium max-[1450px]:basis-[140px] max-[1050px]:hidden'>
        {owner}
      </div>
      <div className='shrink-0 grow-0 basis-[200px] text-sm font-medium max-[1450px]:basis-[144px] max-[1000px]:hidden'>
        {FormatDateStrToDDMMYYYY(lastModified)}
      </div>
      <div className='shrink-0 grow-0 basis-[88px] text-sm font-medium max-[1450px]:basis-[88px] max-[1160px]:hidden'>{size}</div>
      <div className='flex shrink-0 grow-0 basis-[192px] justify-end text-sm font-medium max-[1450px]:basis-[48px]'>
        <CustomDropdown
          button={<Icon icon='ic:baseline-more-vert' className='h-7 w-7 rounded-full p-1 hover:bg-surfaceContainerLow' />}
          items={parent === 'trash' ? [menuItemsTrash] : isDir ? folderOps : fileOps}
        />
      </div>
      {type === 'share' && <SharePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} />}
      {type === 'move' && (
        <MovePopUp
          open={isPopUpOpen}
          handleClose={() => setIsPopUpOpen(false)}
          title={title}
          location={'adfasdfasdf asdfasdfasdf asdfasdf'}
        />
      )}
      {type === 'rename' && <RenamePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} name={title} id={id} />}
      {parent === 'trash' && (
        <DeletePopUp open={isPopUpOpen} handleClose={() => setIsPopUpOpen(false)} title={title} source_ids={[id]} />
      )}
    </div>
  );
};
