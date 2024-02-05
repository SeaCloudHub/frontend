import { Button } from 'antd';

type ButtonFunctionProps = {
  title: string;
  onClick?: () => void;
};

const ButtonFunction = ({ title, onClick }: ButtonFunctionProps) => {
  return (
    <Button type='text' onClick={onClick} className='function-btn'>
      {title}
    </Button>
  );
};

export default ButtonFunction;
