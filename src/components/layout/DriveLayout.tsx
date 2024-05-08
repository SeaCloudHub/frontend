import { useDrawer } from '@/store/my-drive/myDrive.store';
import React from 'react';

type DriveLayoutProps = {
  headerLeft: React.ReactNode;
  bodyLeft: React.ReactNode;
  sidePanel?: React.ReactNode;
};

const DriveLayout: React.FC<DriveLayoutProps> = ({ headerLeft, bodyLeft, sidePanel }) => {
  const drawerOpen = useDrawer((state) => state.drawerOpen);

  return (
    <div className='h-[calc(100vh-4rem)] px-2 py-2'>
      <div className='grid h-full w-full grid-flow-col grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-1 rounded-xl bg-white dark:bg-dashboard-dark'>
        {headerLeft}
        <div className='mb-4 overflow-hidden'>
          <div className='relative flex h-full w-full flex-col overflow-y-auto'>{bodyLeft}</div>
        </div>
        <span className='row-span-2 mb-4'>{drawerOpen && sidePanel}</span>
      </div>
    </div>
  );
};

export default DriveLayout;
