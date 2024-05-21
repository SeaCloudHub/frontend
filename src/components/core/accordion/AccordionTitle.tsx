import { IconButton } from '@mui/material';
import React from 'react';
import IconifyIcon from '../Icon/IConCore';

type AccordionTitleProps = {
  title: string;
  open?: boolean;
  handleOpen?: () => void;
};

const AccordionTitle: React.FC<AccordionTitleProps> = ({ title, open, handleOpen }) => {
  return (
    <>
      <div className='text-md flex items-center justify-between bg-gray-200 px-3 py-2 font-semibold dark:bg-blue-950 dark:text-white'>
        <div className='statement-bold '>{title}</div>
        <IconButton size='medium' onClick={handleOpen}>
          <IconifyIcon
            icon='vaadin:caret-up'
            className={`h-5 w-5 ${!open ? 'rotate-180' : 'rotate-0'} transition-all dark:text-white`}
          />
        </IconButton>
      </div>
      {open && <hr className='h-[1.5px] bg-gray-200' />}
    </>
  );
};

export default AccordionTitle;
