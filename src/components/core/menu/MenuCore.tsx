import Menu from '@mui/material/Menu';
import * as React from 'react';
import ButtonIcon from '../button/ButtonIcon';
import MenuItemCore, { MenuItemCoreProps } from './MenuItem';

type MenuCoreProps = {
  children?: React.ReactNode;
  menuItems: MenuItemCoreProps[];
  mix?: boolean;
};

export default function MenuCore({ menuItems, children, mix }: MenuCoreProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event?: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {!children && <ButtonIcon icon='radix-icons:hamburger-menu' size={'25px'} onClick={handleClick} />}
      {children && <div onClick={handleClick}>{children}</div>}
      <Menu
        sx={{
          '.dark &': {
            '.MuiPaper-root': {
              backgroundColor: '#1E293B',
              color: 'white',
            },
          },
        }}
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {menuItems.map((item, index) => (
          <MenuItemCore
            mix={mix}
            key={index}
            title={item.title}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
            icon={item.icon}
          />
        ))}
      </Menu>
    </>
  );
}
