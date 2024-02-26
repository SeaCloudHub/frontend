import { Pagination } from '@mui/material';

type PaginationCoreProps = {
  currentPage: number;
  totalPage: number;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'standard';
  onPageChange: (page: number) => void;
};

const PaginationCore = ({ currentPage, totalPage, onPageChange, size, color }: PaginationCoreProps) => {
  return (
    <Pagination
      count={totalPage}
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
      size={size}
      color={color}
      siblingCount={1}
      boundaryCount={1}
    />
  );
};

export default PaginationCore;
