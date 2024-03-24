import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { Column } from '../../../utils/types/table-column.type';

export type TableCoreProps<T> = {
  columns: Column<T & { action: React.ReactNode }>[];
  data: T[];
  action?: boolean;
  Element?: React.ReactNode | JSX.Element;
  renderCell?: Record<string, (rowData: T) => React.ReactNode>;
};

const TableCore = <T extends object>({ columns, data, action, Element, renderCell }: TableCoreProps<T>) => {
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
                    background: '#063768',
                    color: 'white',
                    border: '2px solid #000',
                  }}>
                  {column.label}
                </TableCell>
              ))}
              {action && (
                <TableCell
                  style={{
                    background: '#063768',
                    minWidth: 10,
                    maxWidth: 10,
                    border: '2px solid #063768',
                  }}></TableCell>
              )}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} align={column.align} style={{ background: rowIndex % 2 == 0 ? '#e5e7eb' : '' }}>
                    {renderCell && renderCell[column.id as string]
                      ? (renderCell[column.id as string](row) as React.ReactNode)
                      : (row[column.id] as React.ReactNode)}
                  </TableCell>
                ))}
                {action && (
                  <TableCell
                    style={{
                      maxWidth: 10,
                      background: rowIndex % 2 == 0 ? '#e5e7eb' : '',
                    }}>
                    {Element}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCore;
