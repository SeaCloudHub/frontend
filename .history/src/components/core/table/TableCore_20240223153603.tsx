import { Table } from '@mui/material';
import React from 'react';

/*
  Description:
  1. Pass onChange will appear checkbox at 1st column
*/

export type TableCoreProps<T> = {
  columns: ColumnsType<T>;
  data: T[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  className?: string;
  size: SizeType;
  onRow?: any;
};

const TableCore = <T extends object>({ columns, data, onChange, onRow, className, size }: TableCoreProps<T>) => {
  return (
    <div className='w-full'>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        onChange={onChange}
        onRow={onRow}
        className={className}
        size={size}
      />

    </div>
  );
};

export default TableCore;
