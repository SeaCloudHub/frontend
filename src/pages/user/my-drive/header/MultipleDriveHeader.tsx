import IconifyIcon from '@/components/core/Icon/IConCore';
import CustomDropdown from '@/components/core/drop-down/CustomDropdown';
import React from 'react';

type MultipleDriveHeaderProps = {
  type: 'MyDrive' | 'Priority' | 'SharedWithMe' | 'Starred' | 'Trash' | null;
  arrSelected: string[];
  setArrSelected: (value: string[]) => void;
};

const MultipleDriveHeader: React.FC<MultipleDriveHeaderProps> = ({arrSelected, setArrSelected, type}) => {
  return (
    <div className='flex gap-3 items-center h-8'>
      <IconifyIcon icon='mdi:close' className='h-8 w-8 p-1 hover:bg-gray-300 rounded-full' onClick={() => setArrSelected([])} />
      <div> {arrSelected.length} items selected </div>
      {type === 'Trash' ? (
        <>
          <IconifyIcon icon='mdi:restore' className='h-8 w-8 p-1 hover:bg-gray-300 rounded-full cursor-pointer' />
          <IconifyIcon icon='mdi:delete' className='h-8 w-8 p-1 hover:bg-gray-300 rounded-full cursor-pointer' />
        </>
      ) : (
        <>
          <IconifyIcon icon='mdi:account-multiple-plus' className='h-8 w-8 p-1 hover:bg-gray-300 rounded-full cursor-pointer' />
          <IconifyIcon icon='mdi:download' className='h-8 w-8 p-1 hover:bg-gray-300 rounded-full cursor-pointer' />
          <IconifyIcon icon='mdi:folder-move' className={`h-8 w-8 p-1 rounded-full ${type==='SharedWithMe' ? 'brightness-75' : 'hover:bg-gray-300 cursor-pointer'}`} />
          <IconifyIcon icon='mdi:delete' className='h-8 w-8 p-1 hover:bg-gray-300 rounded-full cursor-pointer' />
          <IconifyIcon icon='mdi:link' className='h-8 w-8 hover:bg-gray-300 rounded-full cursor-pointer' />
          <CustomDropdown button={<IconifyIcon icon='mdi:dots-vertical' className='h-8 w-8 hover:bg-gray-300 rounded-full cursor-pointer' />} items={[]} />
        </>
      )}
    </div>
  );
};

export default MultipleDriveHeader;