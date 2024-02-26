import PaginationCore from '../pagination/PaginationCore';
import TableCore, { TableCoreProps } from './TableCore';

export type TablePaginationProps<T> = {
  className?: string;
  onChange?: (selectedRows: T[]) => void;
} & Pick<TableCoreProps<T>, keyof TableCoreProps<T>> & {
    paging: {
      page: number;
      totalPage?: number;
    };
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
      <TableCore columns={columns} data={data} onRow={onRow} onChange={onCheckbox} />
      <PaginationCore currentPage={paging.page} totalPage={paging.totalPage || 1} onPageChange={onPageChange} />
    </div>
  );
}
