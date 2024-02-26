import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

/*
  Description:
  1. Pass onChange will appear checkbox at 1st column
*/

export type Column<T> = {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: 'right'| 'left' | 'center';
  format?: (value: number) => string;
  component?: (row: T) => JSX.Element;
  width?: number;
  render?: (row: T) => JSX.Element;
  cellProps?: (row: T) => React.HTMLAttributes<HTMLTableDataCellElement>;
  headerProps?: React.HTMLAttributes<HTMLTableHeaderCellElement>;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  sort?: (a: T, b: T) => number;
  filter?: (value: string, row: T) => boolean;
  filterValue?: (row: T) => string;
  filterComponent?: (props: { value: string; onChange: (value: string) => void }) => JSX.Element;
  filterProps?: React.HTMLAttributes<HTMLDivElement>;
  filterHeaderProps?: React.HTMLAttributes<HTMLDivElement>;
  filterIcon?: (props: { active: boolean }) => JSX.Element;
  filterIconProps?: React.HTMLAttributes<SVGSVGElement>;
  filterIconHeaderProps?: React.HTMLAttributes<SVGSVGElement>;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date' | 'number' | 'custom';
  filterOptions?: Array<{ label: string; value: string }>;
  filterWidth?: number;
  filterAlign?: 'left' | 'right';
  filterFormat?: (value: string) => string;
  filterComponentProps?: React.HTMLAttributes<HTMLDivElement>;
  filterComponentHeaderProps?: React.HTMLAttributes<HTMLDivElement>;
  filterComponentWidth?: number;
  filterComponentAlign?: 'left' | 'right';
  filterComponentFormat?: (value: string) => string;
  filterComponentOptions?: Array<{ label: string; value: string }>;
  filterComponentType?: 'text' | 'select' | 'date' | 'number' | 'custom';
  filterComponentProps?: React.HTMLAttributes<HTMLDivElement>;
  filterComponentHeaderProps?: React.HTMLAttributes<HTMLDivElement>;
  filterComponentIcon?: (props: { active: boolean }) => JSX.Element;
  filterComponentIconProps?: React.HTMLAttributes<SVGSVGElement>;
  filterComponentIconHeaderProps?: React.HTMLAttributes<SVGSVGElement>;
  filterComponentWidth?: number;
  filterComponentAlign?: '
};

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
