import { useDrawer } from '@/store/my-drive/myDrive.store';
import React from 'react';

type DriveLayoutProps = {
  headerLeft: React.ReactNode;
  headerRight: React.ReactNode;
  bodyLeft: React.ReactNode;
  bodyRight: React.ReactNode;
};

const DriveLayout: React.FC<DriveLayoutProps> = ({ headerLeft, headerRight, bodyLeft, bodyRight }) => {
  const drawerOpen = useDrawer((state) => state.drawerOpen);

  console.log('drawerOpen', drawerOpen);
  return (
    <div className='h-[calc(100vh-80px)]'>
      <div className='grid h-full grid-flow-col grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-1'>
        {headerLeft}
        <div className='mb-4 overflow-hidden'>
          <div className='relative flex h-full w-full flex-col overflow-y-auto'>{bodyLeft}</div>
        </div>
        {drawerOpen && (
          <span className='row-span-2 mb-4 '>
            <div className='h-full w-60 overflow-hidden'>
              {headerRight}
              <div className='relative flex h-full w-full flex-col overflow-y-auto'>{bodyRight}</div>
            </div>
          </span>
        )}
      </div>
    </div>
  );
};

export default DriveLayout;
