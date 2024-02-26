import React from 'react';
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
    perPage: number;
    onPageChange?: (page: number) => void;
  };
  columns: Column<T>[];
  data: T[];
};

const TableCore = <T extends object>({ columns, data, paging }: TableCoreProps<T>) => {
  const [perPage, setPerPage] = React.useState(paging?.perPage || 5);
  // rowPerPageOption là mảng chứa bội số của perPage (nhỏ hơn data.length)
  const rowPerPageOption = Array.from(
    { length: Math.floor(data.length / (paging?.perPage || 5)) },
    (_, i) => (i + 1) * (paging?.perPage || 5) >= data.length ? { label: 'All', value: -1 } : (i + 1) * (paging?.perPage || 5)
  );
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
            {(perPage > 0 ? data.slice((paging?.page || 0) * perPage, (paging?.page || 0) * perPage + perPage) : data).map(
              (row, rowIndex) => (
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
              ),
            )}
          </TableBody>

          {/* Table Footer (pagination) */}
          {paging && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[...rowPerPageOption, { label: 'All', value: -1 }]}
                  onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    setPerPage(parseInt(event.target.value, 10));
                    paging.onPageChange?.(0);
                  }}
                  count={data.length}
                  rowsPerPage={perPage || 5}
                  page={paging?.page || 0}
                  onPageChange={(_, newPage) => {
                    paging.onPageChange?.(newPage);
                  }}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCore;
