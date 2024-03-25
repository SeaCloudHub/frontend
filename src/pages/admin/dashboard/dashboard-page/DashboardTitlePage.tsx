import IconifyIcon from '../../../../components/core/Icon/IConCore';
import { IconButton } from '@mui/material';
import React from 'react';

type DashboardTitlePageProps = {
  title: string;
  open?: boolean;
  handleOpen?: () => void;
};

const DashboardTitlePage: React.FC<DashboardTitlePageProps> = ({ title, open, handleOpen }) => {
  return (
    <>
      <div className='text-md flex items-center justify-between px-3 py-2 font-semibold'>
        <div>{title}</div>
        <IconButton size='medium' onClick={handleOpen}>
          <IconifyIcon icon='vaadin:caret-up' className={`h-5 w-5 ${!open ? 'rotate-180' : 'rotate-0'} transition-all`} />
        </IconButton>
      </div>
      {open && <hr className='h-[1.5px] bg-gray-200' />}
    </>
  );
};

export default DashboardTitlePage;
