import { AspectRatio, Avatar, AvatarGroup, Box, Button, Chip, CssBaseline, CssVarsProvider } from '@mui/joy';
import Navigation from './components/layout/Navigation';
import { useEffect, useState } from 'react';
import Muiii from './components/layout/Muiii';
import Header from './components/layout/Header';
import FileBrowser from './components/layout/FileBrowser';
import FileInfo from './components/layout/FIleInfo';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <div className='max-h-screen grid-cols-1'>
        <div className='shadow-sm'>
          <Muiii.Header>
            <Header
              userAvatar='https://i.pinimg.com/280x280_RS/01/6a/45/016a45c595efdc6d97c7fbc5a562f78b.jpg'
              userName='Nguyen Quang Tuyen'
              userEmail='abcd@efgh.com'
            />
          </Muiii.Header>
        </div>
        <div className='flex h-full flex-row'>
          <div className='w-64 shadow-sm'>
            <Muiii.SideNav>
              <Navigation />
            </Muiii.SideNav>
          </div>
          <div className='w-auto'>
            <Muiii.Main>
              <FileBrowser />
            </Muiii.Main>
          </div>
        </div>
      </div>
    </CssVarsProvider>
  );
}

export default App;
