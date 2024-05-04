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
      <div className='flex  h-fit cursor-pointer  items-center justify-center rounded-full p-1.5 hover:bg-gray-300   hover:dark:bg-slate-800'>
        <IconifyIcon color={color} fontSize={size} height={size} icon={icon} onClick={onClick} />
      </div>
    </Tooltip>
  );
};

export default ButtonIcon;
