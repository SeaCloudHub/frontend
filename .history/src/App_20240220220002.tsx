import PaginationCore from './components/core/pagination/PaginationCore';

function App() {
  return (
    <>
      {/* <div>Mode {import.meta.env.VITE_BACKEND_API_ENDPOINT}</div> */}
      <PaginationCore currentPage={1} totalPage={10} onPageChange={(page) => console.log(page)} />
    </>
  );
}

export default App;
