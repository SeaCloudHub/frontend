import { Tooltip } from '@mui/material';
import IconifyIcon from '../Icon/IConCore';

type ButtonIconProps = {
  icon: string;
  onClick?: () => void;
  size?: number | string;
  color?: string;
  tooltip?: string;
};
const ButtonIcon = ({ onClick, icon, size, color, tooltip }: ButtonIconProps) => {
  return (
    <Tooltip title={tooltip}>
      <div className='flex  cursor-pointer  items-center justify-center rounded-full p-2 hover:bg-gray-200'>
        <IconifyIcon color={color} fontSize={size} height={size} icon={icon} onClick={onClick} />
      </div>
    </Tooltip>
  );
};

export default ButtonIcon;
