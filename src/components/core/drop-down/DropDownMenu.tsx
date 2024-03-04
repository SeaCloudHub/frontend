import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from '@mui/joy';
import { ButtonBase } from '@mui/material';

interface DropDownMenuProps {
  button: React.ReactNode;
  menuItems: { icon: React.ReactNode; label: string }[];
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({ button, menuItems }) => {
  return (
    <Dropdown>
      {button}

      <Menu placement='bottom-start' size='sm'>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <div
              className={`flex 
                  ${item.label.includes('Delete') ? 'text-red-500' : ''}
                  `}>
              <div className='mr-2 h-6 w-6'>{item.icon}</div>
              <div className='mr-2 text-nowrap'>{item.label}</div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};
