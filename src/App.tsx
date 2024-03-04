import {
  AspectRatio,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  CssBaseline,
  CssVarsProvider,
  Divider,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from '@mui/joy';
import renderFilters from './components/pages/UserDashboardPage';
import FileCard from './components/core/file-card/FileCard';
import FolderCard from './components/core/folder-card/FolderCard';
import Navigation from './components/layout/Navigation';
import SideDrawer from './components/layout/SideDrawer';
import { useEffect, useState } from 'react';
import Layout from './components/layout/Layout';
import { EnvelopeIcon, FolderIcon, PencilIcon, ShareIcon, UserGroupIcon, XCircleIcon } from '@heroicons/react/16/solid';
import Header from './components/test/Header';
import TableFiles from './components/test/TableFiles';
import SuperLayout from './components/layout/SuperLayout';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <div className='grid-cols-1 h-screen'>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <div className='flex flex-row'>
          <div className='w-64'>{<Navigation />}</div>
          <div className='w-full'>{<div>concac</div>}</div>
          <div className='w-80'> {<div>concac</div>}</div>
        L</div>
      </div>
    </CssVarsProvider>
  );
}

export default App;
