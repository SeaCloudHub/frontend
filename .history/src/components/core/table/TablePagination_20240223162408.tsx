import classNames from 'classnames';

import { PagingState } from '@/utils/types/paging.type';
import PaginationCore from '../pagination/PaginationCore';
import TableCore, { TableCoreProps } from './TableCore';

export type TablePaginationProps<T> = { className?: string } & Pick<TableCoreProps<T>, 'columns' | 'data' | 'onRow'> & {
    paging: PagingState;
    onCheckbox?: TableCoreProps<T>['onChange'];
    onPageChange: (page: number) => void;
  };

export default function TablePagination<T extends object>({
  paging,
  className,
  columns,
  data,
  onCheckbox,
  onRow,
  onPageChange,
}: TablePaginationProps<T>) {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
