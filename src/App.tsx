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
import renderFilters from './components/pages/DashboardPage';
import FileCard from './components/core/file-card/FileCard';
import FolderCard from './components/core/folder-card/FolderCard';
import Navigation from './components/layout/Navigation';
import SideDrawer from './components/layout/SideDrawer';
import { useState } from 'react';
import Layout from './components/test/Layout';
import { EnvelopeIcon, FolderIcon, PencilIcon, ShareIcon, UserGroupIcon, XCircleIcon } from '@heroicons/react/16/solid';
import Header from './components/test/Header';
import TableFiles from './components/test/TableFiles';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {/* {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )} */}
      {/* <Stack
        id='tab-bar'
        direction='row'
        justifyContent='space-around'
        spacing={1}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}>
        <Button
          variant='plain'
          color='neutral'
          component='a'
          href='/joy-ui/getting-started/templates/email/'
          size='sm'
          startDecorator={<EnvelopeIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}>
          Email
        </Button>
        <Button
          variant='plain'
          color='neutral'
          component='a'
          href='/joy-ui/getting-started/templates/team/'
          size='sm'
          startDecorator={<UserGroupIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}>
          Team
        </Button>
        <Button
          variant='plain'
          color='neutral'
          aria-pressed='true'
          component='a'
          href='/joy-ui/getting-started/templates/files/'
          size='sm'
          startDecorator={<FolderIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}>
          Files
        </Button>
      </Stack> */}
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        {/* <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}>
            {' '}
            <Sheet
              variant='outlined'
              sx={{
                borderRadius: 'sm',
                gridColumn: '1/-1',
                display: { xs: 'none', md: 'flex' },
              }}>
              <TableFiles />
            </Sheet>
            <Sheet
              variant='outlined'
              sx={{
                display: { xs: 'inherit', sm: 'none' },
                borderRadius: 'sm',
                overflow: 'auto',
                backgroundColor: 'background.surface',
                '& > *': {
                  '&:nth-child(n):not(:nth-last-child(-n+4))': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                },
              }}>
              <List size='sm' aria-labelledby='table-in-list'>
                <ListItem>
                  <ListItemButton variant='soft' sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        <Typography level='title-sm' startDecorator={<FolderIcon />} sx={{ alignItems: 'flex-start' }}>
                          Travel pictures
                        </Typography>
                        <AvatarGroup
                          size='sm'
                          sx={{
                            '--AvatarGroup-gap': '-8px',
                            '--Avatar-size': '24px',
                          }}>
                          <Avatar src='https://i.pravatar.cc/24?img=6' srcSet='https://i.pravatar.cc/48?img=6 2x' />
                          <Avatar src='https://i.pravatar.cc/24?img=7' srcSet='https://i.pravatar.cc/48?img=7 2x' />
                          <Avatar src='https://i.pravatar.cc/24?img=8' srcSet='https://i.pravatar.cc/48?img=8 2x' />
                          <Avatar src='https://i.pravatar.cc/24?img=9' srcSet='https://i.pravatar.cc/48?img=9 2x' />
                        </AvatarGroup>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}>
                        <Typography level='body-sm'>987.5MB</Typography>

                        <Typography level='body-sm'>21 Oct 2023, 3PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListDivider />
                <ListItem>
                  <ListItemButton variant='soft' sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        <Typography level='title-sm' startDecorator={<FolderIcon />} sx={{ alignItems: 'flex-start' }}>
                          Important documents
                        </Typography>
                        <AvatarGroup
                          size='sm'
                          sx={{
                            '--AvatarGroup-gap': '-8px',
                            '--Avatar-size': '24px',
                          }}>
                          <Avatar src='https://i.pravatar.cc/24?img=1' srcSet='https://i.pravatar.cc/48?img=1 2x' />
                          <Avatar src='https://i.pravatar.cc/24?img=9' srcSet='https://i.pravatar.cc/48?img=9 2x' />
                          <Avatar src='https://i.pravatar.cc/24?img=2' srcSet='https://i.pravatar.cc/48?img=2 2x' />
                          <Avatar src='https://i.pravatar.cc/24?img=3' srcSet='https://i.pravatar.cc/48?img=3 2x' />
                          <Avatar>+3</Avatar>
                        </AvatarGroup>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}>
                        <Typography level='body-sm'>232.3MB</Typography>

                        <Typography level='body-sm'>26 Sep 2023, 7PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListDivider />
                <ListItem>
                  <ListItemButton variant='soft' sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        <Typography
                          level='title-sm'
                          startDecorator={<FolderIcon color='primary' />}
                          sx={{ alignItems: 'flex-start' }}>
                          Projects
                        </Typography>
                        <AvatarGroup
                          size='sm'
                          sx={{
                            '--AvatarGroup-gap': '-8px',
                            '--Avatar-size': '24px',
                          }}>
                          <Avatar src='https://i.pravatar.cc/24?img=4' srcSet='https://i.pravatar.cc/48?img=4 2x' />
                          <Avatar src='https://i.pravatar.cc/24?img=8' srcSet='https://i.pravatar.cc/48?img=8 2x' />
                          <Avatar src='https://i.pravatar.cc/24?img=5' srcSet='https://i.pravatar.cc/48?img=5 2x' />
                        </AvatarGroup>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}>
                        <Typography level='body-sm'>1.6GB</Typography>

                        <Typography level='body-sm'>12 Aug 2021, 7PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListDivider />
                <ListItem>
                  <ListItemButton variant='soft' sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                        }}>
                        <Typography
                          level='title-sm'
                          startDecorator={<FolderIcon color='primary' />}
                          sx={{ alignItems: 'flex-start' }}>
                          Invoices
                        </Typography>
                        <Avatar
                          size='sm'
                          src='https://i.pravatar.cc/24?img=2'
                          srcSet='https://i.pravatar.cc/48?img=2 2x'
                          sx={{ '--Avatar-size': '24px' }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}>
                        <Typography level='body-sm'>123.3KB</Typography>

                        <Typography level='body-sm'>14 Mar 2021, 7PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </Sheet>
          </Box>
        </Layout.Main> */}
        {/* <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography level='title-md' sx={{ flex: 1 }}>
              torres-del-paine.png
            </Typography>
            <IconButton component='span' variant='plain' color='neutral' size='sm'>
              <XCircleIcon />
            </IconButton>
          </Box>
          <Divider />
          <Tabs>
            <TabList>
              <Tab sx={{ flexGrow: 1 }}>
                <Typography level='title-sm'>Details</Typography>
              </Tab>
              <Tab sx={{ flexGrow: 1 }}>
                <Typography level='title-sm'>Activity</Typography>
              </Tab>
            </TabList>
            <TabPanel value={0} sx={{ p: 0 }}>
              <AspectRatio ratio='21/9'>
                <img
                  alt=''
                  src='https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&auto=format'
                  srcSet='https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&auto=format&dpr=2 2x'
                />
              </AspectRatio>
              <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography level='title-sm' mr={1}>
                  Shared with
                </Typography>
                <AvatarGroup size='sm' sx={{ '--Avatar-size': '24px' }}>
                  <Avatar src='https://i.pravatar.cc/24?img=6' srcSet='https://i.pravatar.cc/48?img=6 2x' />
                  <Avatar src='https://i.pravatar.cc/24?img=7' srcSet='https://i.pravatar.cc/48?img=7 2x' />
                  <Avatar src='https://i.pravatar.cc/24?img=8' srcSet='https://i.pravatar.cc/48?img=8 2x' />
                  <Avatar src='https://i.pravatar.cc/24?img=9' srcSet='https://i.pravatar.cc/48?img=9 2x' />
                </AvatarGroup>
              </Box>
              <Divider />
              <Box
                sx={{
                  gap: 2,
                  p: 2,
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  '& > *:nth-child(odd)': { color: 'text.secondary' },
                }}>
                <Typography level='title-sm'>Type</Typography>
                <Typography level='body-sm' textColor='text.primary'>
                  Image
                </Typography>
                <Typography level='title-sm'>Size</Typography>
                <Typography level='body-sm' textColor='text.primary'>
                  3,6 MB (3,258,385 bytes)
                </Typography>
                <Typography level='title-sm'>Location</Typography>
                <Typography level='body-sm' textColor='text.primary'>
                  Travel pictures
                </Typography>
                <Typography level='title-sm'>Owner</Typography>
                <Typography level='body-sm' textColor='text.primary'>
                  Michael Scott
                </Typography>
                <Typography level='title-sm'>Modified</Typography>
                <Typography level='body-sm' textColor='text.primary'>
                  26 October 2016
                </Typography>
                <Typography level='title-sm'>Created</Typography>
                <Typography level='body-sm' textColor='text.primary'>
                  5 August 2016
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ py: 2, px: 1 }}>
                <Button variant='plain' size='sm' endDecorator={<PencilIcon />}>
                  Add a description
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={1} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography level='title-md'>This week</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar size='sm' src='https://i.pravatar.cc/24?img=2' srcSet='https://i.pravatar.cc/48?img=2 2x' />
                <div>
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}>
                    <Typography level='title-sm' sx={{ alignItems: 'center' }}>
                      You
                    </Typography>
                    <Typography level='body-sm'>shared</Typography>
                    <Typography level='title-sm'>torres-del-paine.png</Typography>
                  </Box>
                  <Chip variant='outlined' startDecorator={<ShareIcon />}>
                    Shared with 3 users
                  </Chip>
                  <Typography level='body-xs' sx={{ mt: 1 }}>
                    3 Nov 2023
                  </Typography>
                </div>
              </Box>
              <Typography level='title-md'>Older</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar size='sm' src='https://i.pravatar.cc/24?img=2' srcSet='https://i.pravatar.cc/48?img=2 2x' />
                <div>
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}>
                    <Typography level='title-sm' sx={{ alignItems: 'center' }}>
                      You
                    </Typography>
                    <Typography level='body-sm'>edited</Typography>
                    <Typography level='title-sm'>torres-del-paine.png</Typography>
                  </Box>
                  <Chip variant='outlined' startDecorator={<PencilIcon />}>
                    Changed name
                  </Chip>
                  <Typography level='body-xs' sx={{ mt: 1 }}>
                    12 Apr 2021
                  </Typography>
                </div>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar size='sm' src='https://i.pravatar.cc/24?img=2' srcSet='https://i.pravatar.cc/48?img=2 2x' />
                <div>
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}>
                    <Typography level='title-sm' sx={{ alignItems: 'center' }}>
                      You
                    </Typography>
                    <Typography level='body-sm'>created</Typography>
                    <Typography level='title-sm'>torres-del-paine.png</Typography>
                  </Box>
                  <Chip variant='outlined' startDecorator={<PencilIcon />}>
                    Added 5 Apr 2021
                  </Chip>
                  <Typography level='body-xs' sx={{ mt: 1 }}>
                    12 Apr 2021
                  </Typography>
                </div>
              </Box>
            </TabPanel>
          </Tabs>
        </Sheet> */}
      </Layout.Root>
    </CssVarsProvider>
  );
}

export default App;
