import { downloadFile } from '@/apis/drive/drive.api';
import IconifyIcon from '@/components/core/Icon/IConCore';
import ButtonIcon from '@/components/core/button/ButtonIcon';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import { MenuItem } from '@/components/core/drop-down/Dropdown';
import DeletePopUp from '@/components/core/pop-up/DeletePopUp';
import DeleteTempPopUp from '@/components/core/pop-up/DeleteTempPopUp';
import MovePopUp from '@/components/core/pop-up/MovePopUp';
import RenamePopUp from '@/components/core/pop-up/RenamePopUp';
import SharePopUp from '@/components/core/pop-up/SharePopUp';
import { useDeleteMutation, useRestoreEntriesMutation, useStarEntryMutation, useUnstarEntryMutation } from '@/hooks/drive.hooks';
import { useSelected } from '@/store/my-drive/myDrive.store';
import { UserRoleEnum } from '@/utils/enums/user-role.enum';
import { CopyToClipboard } from '@/utils/function/copy.function';
import { isSelectedPermission } from '@/utils/function/permisstion.function';
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';

type MultipleDriveHeaderProps = {
  parent: 'MyDrive' | 'Priority' | 'SharedWithMe' | 'Starred' | 'Trash' | null;
  dir: { id: string; name: string };
};

const MultipleDriveHeader: React.FC<MultipleDriveHeaderProps> = ({ dir, parent }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { setArrSelected, arrSelected } = useSelected();
  const [result, setResult] = useState(false);
  const [type, setType] = useState<'move' | 'share' | 'rename' | 'move to trash' | null>();

  const deleteMutation = useDeleteMutation();
  const restoreMutation = useRestoreEntriesMutation();
  const starEntryMutation = useStarEntryMutation();
  const unstarEntryMutation = useUnstarEntryMutation();

  console.log('TEST: ', parent, isSelectedPermission(arrSelected, UserRoleEnum.EDITOR));

  const multipleDriveHeaderMenu: { icon: string; label: string; action: () => void; isHidden?: boolean }[] = [
    {
      icon: 'mdi:account-multiple-plus',
      label: 'Share',
      action: () => {
        setType('share');
        setIsOpened(true);
      },
      isHidden: !isSelectedPermission(arrSelected, UserRoleEnum.EDITOR),
    },
    {
      icon: 'mdi:download',
      label: 'Download',
      action: () => {
        // downloadFile({ id, name: title });
      },
    },
    {
      icon: 'mdi:folder-move',
      label: 'Move',
      action: () => {
        if (parent === 'SharedWithMe') return;
        setType('move');
        setIsOpened(true);
      },
      isHidden: !isSelectedPermission(arrSelected, UserRoleEnum.EDITOR),
    },
    {
      icon: 'mdi:delete',
      label: 'Move to trash',
      action: () => {
        setType('move to trash');
        setIsOpened(true);
      },
    },
    parent === 'Starred'
      ? {
          label: 'Unstar',
          icon: 'mdi:star-off-outline',
          action: () => {
            unstarEntryMutation.mutate({ file_ids: arrSelected.map((e) => e.id) });
          },
        }
      : {
          label: 'Star',
          icon: 'mdi:star',
          action: () => {
            starEntryMutation.mutate({ file_ids: arrSelected.map((e) => e.id) });
          },
        },
    {
      icon: 'mdi:link',
      label: 'Copy link',
      action: () => {
        const links = arrSelected.map((e) => `${window.location.origin}/drive/${e.isDir ? 'folder' : 'file'}/${e.id}`);
        CopyToClipboard(links.join('; '));
      },
    },
    {
      icon: 'mdi:rename-box',
      label: 'Rename',
      action: () => {
        setType('rename');
        setIsOpened(true);
      },
      isHidden: !isSelectedPermission(arrSelected, UserRoleEnum.EDITOR),
    },
  ];

  useEffect(() => {
    if (result) {
      setArrSelected([]);
      setResult(false);
    }
  }, [result, setArrSelected]);

  return (
    <div className='flex min-w-fit items-center gap-3 rounded-full bg-gray-100 p-0.5 dark:bg-search-bg-dark'>
      <Tooltip title='Clear selection'>
        <div>
          <IconifyIcon
            icon='mdi:close'
            className='h-8 w-8 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-slate-500 dark:hover:text-white'
            onClick={() => setArrSelected([])}
          />
        </div>
      </Tooltip>
      <div className='min-w-40'> {arrSelected.length} items selected </div>
      {parent === 'Trash' ? (
        <>
          <IconifyIcon
            icon='mdi:restore'
            className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-200 dark:hover:bg-slate-500 dark:hover:text-white'
            onClick={() => {
              setResult(true);
              restoreMutation.mutate({ source_ids: arrSelected.map((e) => e.id) });
            }}
          />
          <IconifyIcon
            icon='mdi:delete'
            className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-200 dark:hover:bg-slate-500 dark:hover:text-white'
            onClick={() => setIsOpened(true)}
          />
        </>
      ) : (
        multipleDriveHeaderMenu.map(({ label, icon, action, isHidden }, index) => (
          <Tooltip key={index} title={label}>
            <div>
              <IconifyIcon
                icon={icon}
                className={`h-8 w-8 rounded-full p-1 ${
                  isHidden ||
                  (parent === 'SharedWithMe' && label === 'Move to trash') ||
                  (label === 'Rename' && arrSelected.length > 1)
                    ? 'cursor-not-allowed text-gray-400 dark:brightness-75'
                    : 'cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-500 dark:hover:text-white'
                }`}
                onClick={action}
              />
            </div>
          </Tooltip>
        ))
      )}
      {type === 'share' && (
        <SharePopUp fileId='' open={isOpened} handleClose={() => setIsOpened(false)} title={`${arrSelected.length} items`} />
      )}
      {type === 'move' && (
        <MovePopUp open={isOpened} handleClose={() => setIsOpened(false)} title={`${arrSelected.length} items`} location={dir} />
      )}
      {type === 'move to trash' && (
        <DeleteTempPopUp
          open={isOpened}
          handleClose={() => setIsOpened(false)}
          title={`${arrSelected.length} items`}
          id={dir.id}
          source_ids={arrSelected.map((e) => e.id)}
          setResult={setResult}
        />
      )}
      {parent === 'Trash' && (
        <DeletePopUp
          handleClose={() => setIsOpened(false)}
          open={isOpened}
          source_ids={arrSelected.map((e) => e.id)}
          title={''}
          setResult={setResult}
        />
      )}
    </div>
  );
};

export default MultipleDriveHeader;
