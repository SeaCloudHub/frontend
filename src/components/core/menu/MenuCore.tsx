import Menu from '@mui/material/Menu';
import * as React from 'react';
import ButtonIcon from '../button/ButtonIcon';
import MenuItemCore, { MenuItemCoreProps } from './MenuItem';

type MenuCoreProps = {
  children?: React.ReactNode;
  menuItems: MenuItemCoreProps[];
};

export default function MenuCore({ menuItems, children }: MenuCoreProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event?: React.MouseEvent<HTMLButtonElement>| React.MouseEvent<HTMLDivElement>) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {!children && <ButtonIcon icon='radix-icons:hamburger-menu' size={'25px'} onClick={handleClick} />}
      {children && <div onClick={handleClick}>{children}</div>}
      <Menu id='basic-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((item, index) => (
          <MenuItemCore key={index} title={item.title} onClick={item.onClick} icon={item.icon} />
        ))}
      </Menu>
    </div>
  );
}
