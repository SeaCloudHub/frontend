import React, { useState } from 'react';

type TuyenLayoutProps = {
  children: React.ReactNode;
  openDrawer?: boolean;
};

const TuyenLayout: React.FC<TuyenLayoutProps> = ({ children, openDrawer }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className='flex h-screen flex-col'>
      <div className='flex h-[10vh] w-screen bg-red-400'>this is header</div>
      <div className='flex h-[90vh] w-screen flex-1'>
        <div className='h-full w-32 flex-none bg-blue-500'> this is side menu </div>
        <div className='flex flex-1'>{children}</div>
        {openDrawer && <div className='h-full w-64 bg-yellow-300'> this is side info </div>}
      </div>
    </div>
  );
};

export default TuyenLayout;
