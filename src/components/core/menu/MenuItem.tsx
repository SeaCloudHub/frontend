import { MenuItem } from '@mui/material';
import IconifyIcon from '../Icon/IConCore';

export type MenuItemCoreProps = {
  onClick?: () => void;
  title?: string;
  icon?: string | any;
  mix?: boolean;
};
const MenuItemCore = ({ title, onClick, icon, mix }: MenuItemCoreProps) => {
  return (
    <div>
      <MenuItem onClick={onClick}>
        <div className='flex items-center justify-center space-x-3'>
          <IconifyIcon icon={icon} />
          <span style={{ marginLeft: mix || icon !== '' ? '20px' : '0px' }} className='text-sm'>
            {title}
          </span>
        </div>
      </MenuItem>
    </div>
  );
};

export default MenuItemCore;
