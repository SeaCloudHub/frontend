import { Pagination } from '@mui/material';

type PaginationCoreProps = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

const PaginationCore = ({ currentPage, totalPage, onPageChange }: PaginationCoreProps) => {
  return (
    <Pagination
      count={totalPage}
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
      size='medium'
      color='standard'
      siblingCount={1}
      boundaryCount={1}
      showFirstButton
      showLastButton
    />
  );
};

export default PaginationCore;
