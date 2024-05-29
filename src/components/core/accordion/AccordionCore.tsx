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
    <div className='max-h-[300px]  w-full '>
      <div>
        <DashboardTitlePage title={title} handleOpen={handleOpen} open={open} />
      </div>
      <div className={className}>{open && children}</div>
    </div>
  );
};

export default AccordionCore;
