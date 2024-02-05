import { Button } from 'antd';
import './ButtonSearch.css';

type ButtonSearchProps = {
  onClick?: () => void;
};

const ButtonSearch = ({ onClick }: ButtonSearchProps) => {
  return (
    <Button type='text' onClick={onClick} className='search-btn'>
      검색
    </Button>
  );
};

export default ButtonSearch;
