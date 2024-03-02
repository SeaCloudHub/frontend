import IconifyIcon from '../Icon/IConCore';

type ButtonIconProps = {
  icon: string;
  onClick?: () => void;
  size?: number | string;
  color?: string;
};
const ButtonIcon = ({ onClick, icon, size, color }: ButtonIconProps) => {
  return (
    <div className='rounded-full  justify-center  flex items-center   p-3 hover:bg-gray-100'>
      <IconifyIcon color={color} fontSize={size} height={size} icon={icon} onClick={onClick} />
    </div>
  );
};

export default ButtonIcon;
