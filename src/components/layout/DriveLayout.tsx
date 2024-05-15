import { useDrawer } from '@/store/my-drive/myDrive.store';
import React, { useEffect, useRef } from 'react';

type DriveLayoutProps = {
  headerLeft: React.ReactNode;
  bodyLeft: React.ReactNode;
  sidePanel?: React.ReactNode;
  onScrollBottom?: () => void;
};

const DriveLayout: React.FC<DriveLayoutProps> = ({ headerLeft, bodyLeft, sidePanel, onScrollBottom }) => {
  const drawerOpen = useDrawer((state) => state.drawerOpen);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { scrollTop, clientHeight, scrollHeight } = ref.current;
        if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
          onScrollBottom && onScrollBottom();
        }
      }
    };

    ref.current?.addEventListener('scroll', handleScroll);
    return () => {
      ref.current?.removeEventListener('scroll', handleScroll);
    };
  }, [onScrollBottom]);

  return (
    <div className={`h-[calc(100vh-4rem)] px-2 py-2`}>
      <div className='grid h-full w-full grid-flow-col grid-cols-1 grid-rows-[auto_1fr] gap-1 rounded-xl bg-white dark:bg-dashboard-dark'>
        {headerLeft}
        <div className='mb-4 overflow-hidden'>
          <div className='h-full w-full overflow-y-auto relative' ref={ref}>
            {bodyLeft}
          </div>
        </div>
        <span className='row-span-2 mb-4'>{drawerOpen && sidePanel}</span>
      </div>
    </div>
  );
};

export default DriveLayout;
