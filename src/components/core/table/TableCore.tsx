import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { Column } from '../../../utils/types/table-column.type';

export type TableCoreProps<T> = {
  columns: Column<T & { action: React.ReactNode }>[];
  data: T[];
  action?: boolean;
  Element?: React.ReactNode | JSX.Element;
};

const TableCore = <T extends object>({ columns, data, action, Element }: TableCoreProps<T>) => {
  return (
    <div className='w-full'>
      <TableContainer component={Paper}>
        <Table aria-label='tableCore'>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 'bold',
                    borderRight: '1px solid #ddd',
                  }}>
                  {column.label}
                </TableCell>
              ))}
              {action && <TableCell style={{ minWidth: 10, maxWidth: 10, borderRight: '1px solid #ddd' }}></TableCell>}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align={column.align}>
                    {row[column.id] as React.ReactNode}
                  </TableCell>
                ))}
                {action && <TableCell style={{ maxWidth: 10 }}>{Element}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCore;
