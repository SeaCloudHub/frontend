import Menu from '@mui/material/Menu';
import * as React from 'react';
import ButtonIcon from '../button/ButtonIcon';
import MenuItemCore, { MenuItemCoreProps } from './MenuItem';

type MenuCoreProps = {
  menuItems: MenuItemCoreProps[];
};

export default function MenuCore({ menuItems }: MenuCoreProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ButtonIcon icon='radix-icons:hamburger-menu' size={'25px'} onClick={handleClick} />
      <Menu id='basic-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((item, index) => (
          <MenuItemCore key={index} title={item.title} onClick={item.onClick} icon={item.icon} />
        ))}
      </Menu>
    </div>
  );
}
