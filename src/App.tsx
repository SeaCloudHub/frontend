// import { Box, CssBaseline, CssVarsProvider } from '@mui/joy';
// import renderFilters from './components/pages/DashboardPage';
// import FileCard from './components/core/file-card/FileCard';
// import FolderCard from './components/core/folder-card/FolderCard';

import TestPage from './pages/TestPage';

function App() {
  return (
    <>
      {/* <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <div className='flex flex-wrap gap-2 '>
          <div className='w-72'>
            <FileCard
              title='flag.doc'
              size='1KB'
              onClick={() => {
                console.log('clicked');
              }}
            />
          </div>
          <div className='w-72'>
            <FileCard title='flag.mp3' size='1KB' />
          </div>
          <div className='w-72'>
            <FileCard title='flag.png' size='1KB' />
          </div>
          <div className='w-72'>
            <FileCard title='flag.txt' size='1KB' />
          </div>
          <div className='w-72'>
            <FileCard
              title='flag.txt'
              size='1KB'
              preview='https://i.pinimg.com/280x280_RS/01/6a/45/016a45c595efdc6d97c7fbc5a562f78b.jpg'
            />
          </div>
        </div>

        <div className='flex flex-row flex-wrap gap-x-2 mt-2'>
          <div className='w-72'>
            <FolderCard title='flag.mp3' />
          </div>

          <div className='w-72'>
            <FolderCard title='flag.mp3' type='shared' />
          </div>
          <div className='w-72'>
            <FolderCard title='flag.mp3' type='starred' />
          </div>
        </div>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>{renderFilters()}</Box>
        <div className='flex flex-row gap-x-2 '>{renderFilters()}</div>
        <div className='w-40'>{renderFilters()}</div>
      </CssVarsProvider> */}
      <TestPage />
      {/* <DynamicLayout /> */}
    </>
  );
}

export default App;
