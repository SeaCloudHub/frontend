import { Button } from 'antd';

type ButtonUploadProps = {
  onClick?: () => void;
};

const ButtonUpload = ({ onClick }: ButtonUploadProps) => {
  return (
    <Button type='text' onClick={onClick} className='upload-btn'>
    </Button>
  );
};

export default ButtonUpload;
