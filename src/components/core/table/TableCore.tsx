import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import React from 'react';
import './TableCore.css';
import { Column } from '../../../utils/types/table-column.type';

export type TableCoreProps<T> = {
  columns: Column<T & { action: React.ReactNode }>[];
  data: T[];
  setData?: React.Dispatch<React.SetStateAction<T[]>>;
  action?: boolean;
  Element?: React.ReactNode | JSX.Element;
  renderCell?: Record<string, (rowData: T) => React.ReactNode>;
  onClick?: (rowData: T) => void;
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<T>(order: 'asc' | 'desc', orderBy: keyof T) {
  return order === 'desc'
    ? (a: T, b: T) => descendingComparator(a, b, orderBy)
    : (a: T, b: T) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const TableCore = <T extends object>({ columns, data, action, Element, renderCell, onClick }: TableCoreProps<T>) => {
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof T>('' as keyof T);

  const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className='w-full'>
      <TableContainer component={Paper}>
        <Table
          aria-label='tableCore'
          onClick={(e) => {
            if (onClick) {
              const target = e.target as HTMLElement;
              const row = target.closest('tr');
              if (row) {
                const index = row.rowIndex - 1;
                onClick(data[index]);
              }
            }
          }}>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  sortDirection={orderBy === column.id ? order : false}
                  style={{
                    minWidth: column.minWidth,
                    width: column.width,
                    fontWeight: 'bold',
                    background: '#063768',
                    // color: 'white',
                    border: '2px solid #000',
                  }}>
                  {column.noneSort ? (
                    column.label
                  ) : (
                    <TableSortLabel
                      style={{
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={createSortHandler(column.id)}>
                      {column.label}
                    </TableSortLabel>
                  )}
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
            {stableSort(data, getComparator(order, orderBy)).map((row, rowIndex) => (
              <TableRow key={rowIndex} className='cursor-pointer hover:brightness-90  active:brightness-95' hover>
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
