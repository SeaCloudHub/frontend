import { Path } from '@/store/my-drive/myDrive.store';
import { UserRole } from '@/utils/types/user-role.type';
import { ExpandMore, NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, IconButton, Link, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';

type ShareFolderBreadcumProps = {
  path: { id: string; name: string; userRoles: UserRole[] }[];
};

const ShareFolderBreadcum: React.FC<ShareFolderBreadcumProps> = ({ path }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Breadcrumbs aria-label='breadcrumb' className='text-sm' separator={<NavigateNext fontSize='small' />}>
      {path.length <= 3 ? (
        path.map((p, index) => (
          <Link
            key={index}
            underline='hover'
            color='inherit'
            href={`/user/share/${p.id}`}
            className='text-blue-600 hover:underline'>
            {p.name}
          </Link>
        ))
      ) : (
        <>
          <Link underline='hover' color='inherit' href={`/user/share/${path[0].id}`} className='text-blue-600 hover:underline'>
            {path[0].name}
          </Link>
          <div>
            <IconButton onClick={handleClick} className='p-0'>
              <Typography color='inherit' className='mr-1'>
                ...
              </Typography>
              <ExpandMore />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}>
              {path.slice(1, -2).map((p, index) => (
                <MenuItem key={index} onClick={handleClose}>
                  <Link href={`/user/share/${p.id}`} color='inherit' className='text-blue-600 hover:underline'>
                    {p.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <Link
            underline='hover'
            color='inherit'
            href={`/user/share/${path[path.length - 2].id}`}
            className='text-blue-600 hover:underline'>
            {path[path.length - 2].name}
          </Link>
          <Typography color='textPrimary'>{path[path.length - 1].name}</Typography>
        </>
      )}
    </Breadcrumbs>
  );
};

export default ShareFolderBreadcum;
