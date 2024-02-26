import { useState } from 'react';
// import PaginationCore from './components/core/pagination/PaginationCore';
import TableCore from './components/core/table/TableCore';



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
