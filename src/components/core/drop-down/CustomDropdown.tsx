import { Divider, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { MenuItem as MenuItemCustom } from './Dropdown';

type DropdownProps = {
  button: React.ReactNode;
  items: MenuItemCustom[][];
};

const CustomDropdown: React.FC<DropdownProps> = ({ button, items }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div onClick={handleClick}>{button}</div>
      <Menu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {items.map((group, ind) => (
          <div key={ind}>
            {group.map(({ label, icon, action }) => (
              <MenuItem
                key={label}
                onClick={() => {
                  action && action();
                  handleClose();
                }}
                sx={{ minWidth: '200px', py: '3px', fontSize: '14px' }}>
                <div className='flex items-center space-x-2'>
                  {icon}
                  <div>{label}</div>
                </div>
              </MenuItem>
            ))}
            {ind !== items.length - 1 && <Divider />}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default CustomDropdown;
