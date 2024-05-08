import { Paper } from '@mui/material';
import React from 'react';
import DashboardTitlePage from './AccordionTitle';

type DashboardPageProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const AccordionCore: React.FC<DashboardPageProps> = ({ title, children, className }) => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(!open);
  return (
    <Paper elevation={3} className='w-full'>
      <div>
        <DashboardTitlePage  title={title} handleOpen={handleOpen} open={open} />
      </div>
      <div className={className}>{open && children}</div>
    </Paper>
  );
};

export default AccordionCore;
