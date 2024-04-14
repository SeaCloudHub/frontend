import { MenuItem } from '@mui/material';
import IconifyIcon from '../Icon/IConCore';

export type MenuItemCoreProps = {
  onClick?: () => void;
  title?: string;
  icon?: string | any;
};
const MenuItemCore = ({ title, onClick, icon }: MenuItemCoreProps) => {
  return (
    <div>
      <MenuItem onClick={onClick}>
        <div className='flex items-center justify-center space-x-3'>
          <IconifyIcon icon={icon} />
          <span style={{ marginLeft: '20px' }} className='text-sm'>
            {title}
          </span>
        </div>
      </MenuItem>
    </div>
  );
};

export default MenuItemCore;
