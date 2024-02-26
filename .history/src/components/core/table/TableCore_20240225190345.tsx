import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import PaginationCore from '../pagination/PaginationCore';

export type Column<T> = {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
  width?: number;
  render?: (row: T) => JSX.Element;
};

export type TableCoreProps<T> = {
  columns: Column<T>[];
  data: T[];
  onChange?: (selectedRows: T[]) => void;
};

const TableCore = <T extends object>({ columns, data }: TableCoreProps<T>) => {
  return (
    <div className='w-full'>
      <TableContainer component={Paper}>
        <Table aria-label='tableCore'>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} align={column.align} style={{ minWidth: column.minWidth, borderRight: '1px solid #ddd' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align={column.align}>
                    {column.format
                      ? column.format(row[column.id] as number)
                      : column.render
                        ? column.render(row)
                        : (row[column.id] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          {/* Table footer */}
          <TableFooter>
            <TableRow>
                <PaginationCore currentPage={1} totalPage={10} onPageChange={()} />
            </TableRow>
        </TableFooter>
      </TableContainer>
    </div>
  );
};

export default TableCore;
