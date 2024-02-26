import { Table, TableBody, TableCell, TableFooter, TableRow } from '@mui/material';
import React from 'react';
import TablePagination from './TablePagination';

/*
  Description:
  1. Pass onChange will appear checkbox at 1st column
*/

export type TableCoreProps<T> = {
  columns: Array<Column<T>>;
  data: Array<T>;
  onChange?: (selected: Array<T>) => void;
  onRow?: (row: T) => void;
  className?: string;
  size?: 'small' | 'medium';
};

const TableCore = <T extends object>({ columns, data, onChange, onRow, className, size }: TableCoreProps<T>) => {
  return (
    <div className='w-full'>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.calories}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.fat}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableCore;
