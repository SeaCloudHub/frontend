import { Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { Path } from '@/store/my-drive/myDrive.store';
import React from 'react';

type CustomBreadcumsProps = {
  path: Path;
  onClick?: (id?: string, name?: string) => void;
};

const CustomBreadcums: React.FC<CustomBreadcumsProps> = ({ path, onClick }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize='small' />}
      aria-label='breadcrumb'
      classes={{ root: 'mb-3 dark:text-white select-none' }}
      sx={{
        fontSize: '0.875rem',
      }}>
      {path.map((p, index) =>
        index <= path.length - 2 ? (
          <Link key={index} underline='hover' color='inherit' onClick={() => onClick(p.id, p.name)} className='cursor-pointer'>
            {p.name}
          </Link>
        ) : (
          <Typography
            key={index}
            color='text.primary'
            classes={{ root: 'cursor-default dark:text-white select-none' }}
            sx={{
              fontSize: '0.875rem',
            }}>
            {p.name}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
};

export default CustomBreadcums;
