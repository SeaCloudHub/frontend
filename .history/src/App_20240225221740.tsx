// import { useState } from 'react';
// import PaginationCore from './components/core/pagination/PaginationCore';
import { useState } from 'react';
import TableCore, { Column } from './components/core/table/TableCore';

const columns: Column<{ id: number; name: string; age: number; country: string; position: string; salary: number; }>[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'age', label: 'Age', minWidth: 50 },
  {
    id: 'country',
    label: 'Country',
    minWidth: 100,
  },
  {
    id: 'position',
    label: 'Position',
    minWidth: 100,
  },
  {
    id: 'salary',
    label: 'Salary',
    minWidth: 100,
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

const data = [
  { id: 1, name: 'John Doe', age: 33, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 2, name: 'Jane Doe', age: 29, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 3, name: 'John Smith', age: 35, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 4, name: 'Jane Smith', age: 31, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 5, name: 'John Johnson', age: 37, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 6, name: 'Jane Johnson', age: 32, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 7, name: 'John Brown', age: 39, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 8, name: 'Jane Brown', age: 34, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 9, name: 'John White', age: 41, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 10, name: 'Jane White', age: 36, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 11, name: 'John Black', age: 43, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 12, name: 'Jane Black', age: 38, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 13, name: 'John Green', age: 45, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 14, name: 'Jane Green', age: 40, country: 'USA', position: 'Software Engineer', salary: 150000 },
  { id: 15, name: 'John Blue', age: 47, country: 'USA', position: 'Software Engineer', salary: 150000 },
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };



  return (
    <div>
      {/* <div>Mode {import.meta.env.VITE_BACKEND_API_ENDPOINT}</div> */}
      {/* <PaginationCore currentPage={currentPage} totalPage={10} onPageChange={onPageChange} /> */}
      {/* <div>Current page: {currentPage}</div> */}

      <div className='w-3/5 mx-auto'>
        <TableCore
          columns={columns}
          data={data}
          paging={{ page: currentPage, perPage: 5 }}
          onPageChange={(page: number) => setCurrentPage(page)}></TableCore>
      </div>
    </div>
  );
}

export default App;
