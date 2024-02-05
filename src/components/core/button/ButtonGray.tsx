import { Button } from 'antd';

type ButtonGrayProps = {
  title?: string;
  onClick?: () => void;
};

const ButtonGray = ({ title, onClick }: ButtonGrayProps) => {
  return (
    <Button type='text' onClick={onClick} className='gray-btn w-full'>
      {title}
    </Button>
  );
};

export default ButtonGray;
