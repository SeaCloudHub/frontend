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
import Header from './components/layout/Header';
import TableFiles from './components/test/TableFiles';
import SuperLayout from './components/layout/SuperLayout';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <div className='h-screen grid-cols-1'>
        <Layout.Header>
          <Header
            userAvatar='https://i.pinimg.com/280x280_RS/01/6a/45/016a45c595efdc6d97c7fbc5a562f78b.jpg'
            userName='Nguyen Quang Tuyen'
            userEmail='abcd@efgh.com'
          />
        </Layout.Header>
        <div className='flex flex-row'>
          <div className='w-64'>{<Navigation />}</div>
          <div className='w-full'>{<div>adu</div>}</div>
          <div className='w-80'> {<div>adu</div>}</div>L
        </div>
      </div>
    </CssVarsProvider>
  );
}

export default App;
