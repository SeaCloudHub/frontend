import { useDrawer } from '@/store/my-drive/myDrive.store';
import React from 'react';

type DriveLayoutProps = {
  headerLeft: React.ReactNode;
  bodyLeft: React.ReactNode;
  headerRight?: React.ReactNode;
  bodyRight?: React.ReactNode;
  sidePanel?: React.ReactNode;
};

const DriveLayout: React.FC<DriveLayoutProps> = ({ headerLeft, headerRight, bodyLeft, bodyRight, sidePanel }) => {
  const drawerOpen = useDrawer((state) => state.drawerOpen);

  console.log('drawerOpen', drawerOpen);
  return (
    <div className='h-[calc(100vh-80px)]'>
      <div className='grid h-full grid-flow-col grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-1'>
        {headerLeft}
        <div className='mb-4 overflow-hidden'>
          <div className='relative flex h-full w-full flex-col overflow-y-auto'>{bodyLeft}</div>
        </div>
        <span className='row-span-2 mb-4'>
          {drawerOpen &&
            (sidePanel ? (
              sidePanel
            ) : (
              <div className='h-full w-[336px] overflow-hidden'>
                {headerRight}
                <div className='relative flex h-full w-full flex-col overflow-y-auto'>{bodyRight}</div>
              </div>
            ))}
        </span>
      </div>
    </div>
  );
};

export default DriveLayout;
