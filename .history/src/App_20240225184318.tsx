// import { useState } from 'react';
// import PaginationCore from './components/core/pagination/PaginationCore';
import TableCore from './components/core/table/TableCore';

columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'age', label: 'Age', minWidth
: 50 },
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

function App() {
  // const [currentPage, setCurrentPage] = useState(1);

  // const onPageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  return (
    <div>
      {/* <div>Mode {import.meta.env.VITE_BACKEND_API_ENDPOINT}</div> */}
      {/* <PaginationCore currentPage={currentPage} totalPage={10} onPageChange={onPageChange} /> */}
      {/* <div>Current page: {currentPage}</div> */}

      <TableCore columns={[]} data={[]} />
    </div>
  );
}

export default App;
