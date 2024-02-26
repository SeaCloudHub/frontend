
type PaginationCoreProps = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

const PaginationCore = ({ currentPage, totalPage, onPageChange }: PaginationCoreProps) => {
  const pageChangeHandler = (type: 'prev' | 'next') => {
    if (type === 'prev' && currentPage <= totalPage && currentPage > 1) onPageChange(currentPage - 1);
    else if (type === 'next' && currentPage >= 1 && currentPage < totalPage) onPageChange(currentPage + 1);
  };

  return (
    <div className='flex gap-1'>
    </div>
  );
};

export default PaginationCore;
