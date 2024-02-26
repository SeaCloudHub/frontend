import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

/*
  Description:
  1. Pass onChange will appear checkbox at 1st column
*/

export type Column = {
  id: number;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  rowSpan?: number;
};

export type TableCoreProps<T> = {
  columns: Array<Column>;
  data: Array<T>;
  onChange?: (selected: Array<T>) => void;
  onRow?: (row: T) => void;
  className?: string;
  size?: 'small' | 'medium';
};

const TableCore = <T extends object>({ columns, data, onChange, onRow, className, size }: TableCoreProps<T>) => {
  return (
    <div className='w-full'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='tableCore'>
          {/* ================== Table Header =================== */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, borderRight: '1px solid #ddd' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* ================== Table Body =================== */}
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableCore;
