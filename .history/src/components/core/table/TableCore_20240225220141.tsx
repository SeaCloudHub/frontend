import React, { useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

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
  paging?: {
    page: number;
    totalPage?: number;
  };
  columns: Column<T>[];
  data: T[];
  onPageChange?: (page: number) => void;
  // onChange?: (selectedRows: T[]) => void;
};

const TableCore = <T extends object>({ columns, data, onPageChange, paging }: TableCoreProps<T>) => {
  const subData = data.slice((paging?.page ?? 0) * 5, ((paging?.page ?? 0) + 1) * 5);
  useEffect(() => {
    console.log('subData', subData);
  }, [paging?.page, subData]);
  return (
    <div className='w-full'>
      <TableContainer>
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
            {subData.map((row, rowIndex) => (
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={5}
              page={paging?.page || 0}
              onPageChange={(_, newPage) => {
                onPageChange && onPageChange(newPage);
              }}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCore;
