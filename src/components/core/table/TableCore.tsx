'use client';
import { Table } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import './TableCore.css';

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
        size={size}
        rowSelection={
          onChange && {
            type: 'checkbox',
            onChange,
          }
        }
        onRow={onRow}
        dataSource={data}
        columns={columns}
        pagination={false}
        rowClassName={(record, index, indent) => ''}
        className={`${className}`}
      />
    </div>
  );
};

export default TableCore;
