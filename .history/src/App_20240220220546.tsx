import { useState } from 'react';
import PaginationCore from './components/core/pagination/PaginationCore';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div>
      {/* <div>Mode {import.meta.env.VITE_BACKEND_API_ENDPOINT}</div> */}
      <PaginationCore currentPage={currentPage} totalPage={10} onPageChange={(page) => console.log(page)} />
    </div>
  );
}

export default App;
