import { Paper } from '@mui/material';
import DashboardTitlePage from './AccordionTitle';
import React from 'react';

type DashboardPageProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const AccordionCore: React.FC<DashboardPageProps> = ({ title, children, className }) => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(!open);
  return (
    <Paper elevation={3} className={className}>
      <div>
        <DashboardTitlePage title={title} handleOpen={handleOpen} open={open} />
      </div>
      {open && children}
    </Paper>
  );
};

export default AccordionCore;
