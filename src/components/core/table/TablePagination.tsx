import { PagingState } from '../../../utils/types/paging-stage.type';
import PaginationCore from '../pagination/PaginationCore';
import TableCore, { TableCoreProps } from './TableCore';

type TablePaginationProps<T> = TableCoreProps<T> & {
  paging: PagingState;
  onPageChange: (page: number) => void;
};

const TablePagination = <T extends object>({
  columns,
  paging,
  data,
  Element,
  action,
  onPageChange,
  renderCell,
  onClick,
}: TablePaginationProps<T>) => {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <TableCore renderCell={renderCell} columns={columns} data={data} action={action} Element={Element} onClick={onClick} />
      <PaginationCore
        size='large'
        currentPage={paging.page}
        totalPage={paging.totalPage}
        onPageChange={onPageChange}
        color='standard'
      />
    </div>
  );
};

export default TablePagination;
