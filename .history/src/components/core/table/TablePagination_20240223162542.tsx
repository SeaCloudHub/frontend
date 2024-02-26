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
    <div className={classNames('flex flex-col items-center gap-8', className)}>
      <TableCore columns={columns} data={data} size='middle' onRow={onRow} onChange={onCheckbox} />
      <PaginationCore currentPage={paging.page} totalPage={paging.totalPage || 1} onPageChange={onPageChange} />
    </div>
  );
}
