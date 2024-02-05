import { Button } from 'antd';

type ButtonDeleteProps = {
  onClick?: () => void;
};

const ButtonDelete = ({ onClick }: ButtonDeleteProps) => {
  return (
    <Button type='text' onClick={onClick} className='delete-btn'>
      삭 제
    </Button>
  );
};

export default ButtonDelete;
