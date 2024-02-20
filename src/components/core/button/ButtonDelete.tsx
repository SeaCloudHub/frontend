import IconifyIcon from '../Icon/IConCore';
import ButtonCore from './ButtonCore';

type ButtonDeleteProps = {
  onClick?: () => void;
};

const ButtonDelete = ({ onClick }: ButtonDeleteProps) => {
  return (
    <ButtonCore
      icon={<IconifyIcon icon={'fluent:delete-48-regular'} />}
      type='outlined'
      text='Delete'
      color='error'
      onClick={onClick}
    />
  );
};

export default ButtonDelete;
