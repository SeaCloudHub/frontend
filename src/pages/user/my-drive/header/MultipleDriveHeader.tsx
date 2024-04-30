import IconifyIcon from '@/components/core/Icon/IConCore';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import React from 'react';

type MultipleDriveHeaderProps = {
  type: 'MyDrive' | 'Priority' | 'SharedWithMe' | 'Starred' | 'Trash' | null;
  arrSelected: string[];
  setArrSelected: (value: string[]) => void;
};

const MultipleDriveHeader: React.FC<MultipleDriveHeaderProps> = ({ arrSelected, setArrSelected, type }) => {
  return (
    <div className='flex h-8 items-center gap-3'>
      <IconifyIcon icon='mdi:close' className='h-8 w-8 rounded-full p-1 hover:bg-gray-300' onClick={() => setArrSelected([])} />
      <div> {arrSelected.length} items selected </div>
      {type === 'Trash' ? (
        <>
          <IconifyIcon icon='mdi:restore' className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-300' />
          <IconifyIcon icon='mdi:delete' className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-300' />
        </>
      ) : (
        <>
          <IconifyIcon icon='mdi:account-multiple-plus' className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-300' />
          <IconifyIcon icon='mdi:download' className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-300' />
          <IconifyIcon
            icon='mdi:folder-move'
            className={`h-8 w-8 rounded-full p-1 ${type === 'SharedWithMe' ? 'brightness-75' : 'cursor-pointer hover:bg-gray-300'}`}
          />
          <IconifyIcon icon='mdi:delete' className='h-8 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-300' />
          <IconifyIcon icon='mdi:link' className='h-8 w-8 cursor-pointer rounded-full hover:bg-gray-300' />
          <CustomDropdown
            button={<IconifyIcon icon='mdi:dots-vertical' className='h-8 w-8 cursor-pointer rounded-full hover:bg-gray-300' />}
            items={[]}
          />
        </>
      )}
    </div>
  );
};

export default MultipleDriveHeader;
