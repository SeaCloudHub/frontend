import { Pagination } from "@mui/material";

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
      size='large'
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
