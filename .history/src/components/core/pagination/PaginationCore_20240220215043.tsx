
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
      <button className='cursor-pointer' onClick={pageChangeHandler.bind(null, 'prev')} title='prev' type='button'>
        <Image src='/assets/icons/left-arrow.svg' alt='left-arrow' width={24} height={24} />
      </button>
      <div className='flex gap-1'>
        {[...Array(totalPage)].map((item, index) => (
          <button
            type='button'
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`w-[24px] h-[24px] text-center cursor-pointer
              ${currentPage === index + 1 ? 'current-page' : ''}`}>
            {index + 1}
          </button>
        ))}
      </div>
      <button className='cursor-pointer' onClick={pageChangeHandler.bind(null, 'next')} title='next' type='button'>
        <Image src='/assets/icons/right-arrow.svg' alt='right-arrow' width={24} height={24} />
      </button>
    </div>
  );
};

export default PaginationCore;
