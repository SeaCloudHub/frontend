import { Button } from 'antd';

type ButtonBlackProps = {
  title?: string;
  onClick?: () => void;
};

const ButtonBlack = ({ title, onClick }: ButtonBlackProps) => {
  return (
    <Button type='text' onClick={onClick} className='black-btn'>
      {title}
    </Button>
  );
};

export default ButtonBlack;
