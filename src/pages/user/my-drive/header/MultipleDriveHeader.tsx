import IconifyIcon from '@/components/core/Icon/IConCore';
import ButtonIcon from '@/components/core/button/ButtonIcon';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import DeletePopUp from '@/components/core/pop-up/DeletePopUp';
import DeleteTempPopUp from '@/components/core/pop-up/DeleteTempPopUp';
import MovePopUp from '@/components/core/pop-up/MovePopUp';
import RenamePopUp from '@/components/core/pop-up/RenamePopUp';
import SharePopUp from '@/components/core/pop-up/SharePopUp';
import { useDeleteMutation, useRestoreEntriesMutation } from '@/hooks/drive.hooks';
import { useSelected } from '@/store/my-drive/myDrive.store';
import React, { useEffect, useState } from 'react';

type MultipleDriveHeaderProps = {
  parent: 'MyDrive' | 'Priority' | 'SharedWithMe' | 'Starred' | 'Trash' | null;
  dir: { id: string; name: string };
};

const MultipleDriveHeader: React.FC<MultipleDriveHeaderProps> = ({ dir, parent }) => {
  const deleteMutation = useDeleteMutation();
  const restoreMutation = useRestoreEntriesMutation();
  const [isOpened, setIsOpened] = useState(false);
  const { setArrSelected, arrSelected } = useSelected();
  const [result, setResult] = useState(false);
  const [type, setType] = useState<'move' | 'share' | 'rename' | 'move to trash' | null>();

  useEffect(() => {
    if (result) {
      setArrSelected([]);
      setResult(false);
    }
  }, [result, setArrSelected]);

  return (
    <div className='flex h-8 items-center gap-3 min-w-fit'>
      <IconifyIcon icon='mdi:close' className='h-8 w-8 rounded-full p-1 hover:bg-gray-300' onClick={() => setArrSelected([])} />
      <div className='min-w-40'> {arrSelected.length} items selected </div>
      {parent === 'Trash' ? (
        <>
          <IconifyIcon
            icon='mdi:restore'
            className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-300'
            onClick={() => {
              setResult(true);
              restoreMutation.mutate({ source_ids: arrSelected });
            }}
          />
          <IconifyIcon
            icon='mdi:delete'
            className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-300'
            onClick={() => setIsOpened(true)}
          />
        </>
      ) : (
        <>
          <IconifyIcon
            icon='mdi:account-multiple-plus'
            className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-300'
            onClick={() => {
              setType('share');
              setIsOpened(true);
            }}
          />
          <IconifyIcon icon='mdi:download' className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-300' />
          <IconifyIcon
            icon='mdi:folder-move'
            className={`h-8 w-8 rounded-full p-1 ${parent === 'SharedWithMe' ? 'brightness-75' : 'cursor-pointer hover:bg-gray-300'}`}
            onClick={() => {
              if (parent === 'SharedWithMe') return;
              setType('move');
              setIsOpened(true);
            }}
          />
          <IconifyIcon
            icon='mdi:delete'
            className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-300'
            onClick={() => {
              setType('move to trash');
              setIsOpened(true);
            }}
          />
          <IconifyIcon icon='mdi:link' className='h-8 w-8 cursor-pointer rounded-full hover:bg-gray-300' onClick={() => {}} />
          <CustomDropdown
            button={<IconifyIcon icon='mdi:dots-vertical' className='h-8 w-8 cursor-pointer rounded-full hover:bg-gray-300' />}
            items={[]}
          />
        </>
      )}
      {type === 'share' && (
        <SharePopUp open={isOpened} handleClose={() => setIsOpened(false)} title={`${arrSelected.length} items`} />
      )}
      {type === 'move' && (
        <MovePopUp
          open={isOpened}
          handleClose={() => setIsOpened(false)}
          title={`${arrSelected.length} items`}
          location={dir}
        />
      )}
      {type === 'move to trash' && (
        <DeleteTempPopUp
          open={isOpened}
          handleClose={() => setIsOpened(false)}
          title={`${arrSelected.length} items`}
          id={dir.id}
          source_ids={arrSelected}
          setResult={setResult}
        />
      )}
      {parent === 'Trash' && (
        <DeletePopUp
          handleClose={() => setIsOpened(false)}
          open={isOpened}
          source_ids={arrSelected}
          title={''}
          setResult={setResult}
        />
      )}
    </div>
  );
};

export default MultipleDriveHeader;
