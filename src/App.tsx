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
import FileBrowser from './components/layout/FileBrowser';
import TestPage from './pages/TestPage';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    // <CssVarsProvider disableTransitionOnChange>
    //   <CssBaseline />
    //   <div className='h-screen grid-cols-1'>
    //     <Layout.Header>
    //       <Header
    //         userAvatar='https://i.pinimg.com/280x280_RS/01/6a/45/016a45c595efdc6d97c7fbc5a562f78b.jpg'
    //         userName='Nguyen Quang Tuyen'
    //         userEmail='abcd@efgh.com'
    //       />
    //     </Layout.Header>
    //     <div className='flex h-full flex-row'>
    //       <div className='w-64'>
    //         <Layout.SideNav>
    //           <Navigation />
    //         </Layout.SideNav>
    //       </div>
    //       <div className='w-[1200px]'>
    //         <Layout.Main>
    //           <FileBrowser />
    //         </Layout.Main>
    //       </div>
    //       <div>
    //         <div>file info</div>
    //       </div>
    //     </div>
    //   </div>
    // </CssVarsProvider>
    <TestPage />
  );
}

export default App;
