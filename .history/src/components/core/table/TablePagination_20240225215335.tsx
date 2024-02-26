import TableCore, { TableCoreProps } from './TableCore';

export type TablePaginationProps<T> = {
  className?: string;
  onChange?: (selectedRows: T[]) => void;
} & Pick<TableCoreProps<T>, keyof TableCoreProps<T>> & {
    paging: {
      page: number;
      totalPage?: number;
    };
    onPageChange?: TableCoreProps<T>['onPageChange'];
  };

export default function TablePagination<T extends object>({
  paging,
  className,
  columns,
  data,
  onPageChange,
}: TablePaginationProps<T>) {
  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      <TableCore columns={columns} data={data} onPageChange={onPageChange} />
    </div>
  );
}
