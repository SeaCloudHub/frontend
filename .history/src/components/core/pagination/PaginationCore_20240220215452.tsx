import { Pagination } from "@mui/material";

type PaginationCoreProps = {
  currentPage: number;
  totalPage: number;
  onPageChange: (event: React.ChangeEvent<unknown> ,page: number) => void;
};

const PaginationCore = ({ currentPage, totalPage, onPageChange }: PaginationCoreProps) => {
  const pageChangeHandler = (type: 'prev' | 'next') => {
    if (type === 'prev' && currentPage <= totalPage && currentPage > 1) onPageChange(currentPage - 1);
    else if (type === 'next' && currentPage >= 1 && currentPage < totalPage) onPageChange(currentPage + 1);
  };

  return (
    <Pagination
      count={totalPage}
      page={currentPage}
      onChange={pageChangeHandler}
      size="large"
      color="primary"
      siblingCount={1}
      boundaryCount={1}
      showFirstButton
      showLastButton
      sx={{
        '& .MuiPaginationItem-root': {
          color: theme.palette.primary.main,
        },
        '& .Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
      }}
    />
  );
};

export default PaginationCore;
