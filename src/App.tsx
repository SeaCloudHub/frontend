import { AspectRatio, Avatar, AvatarGroup, Box, Button, Chip, CssBaseline, CssVarsProvider } from '@mui/joy';
import Navigation from './components/layout/Navigation';
import { useEffect, useState } from 'react';
import Muiii from './components/layout/Muiii';
import Header from './components/layout/Header';
import FileBrowser from './components/layout/FileBrowser';
import FileInfo from './components/layout/FIleInfo';
import DynamicLayout from './components/layout/DynamicLayout';
import { Route, Routes } from 'react-router-dom';
import { routes } from './utils/constants/router.constant';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <DynamicLayout>
      <Routes>
        {routes.map((item, index) => (
          <Route path={item.path} Component={item.component} key={index} />
        ))}
      </Routes>
    </DynamicLayout>
  );
}

export default App;
