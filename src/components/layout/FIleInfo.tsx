import { CloseRounded, EditRounded, ShareRounded } from '@mui/icons-material';
import {
  AspectRatio,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Sheet,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from '@mui/joy';
import React from 'react';

const FileInfo: React.FC = () => {
  return (
    <Sheet
      sx={{
        display: { xs: 'none', sm: 'initial' },
        borderLeft: '1px solid',
        borderColor: 'divider',
      }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Typography level='title-md' sx={{ flex: 1 }}>
          File.png
        </Typography>
        <IconButton component='span' variant='plain' color='neutral' size='sm'>
          <CloseRounded />
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
            <img src='https://i.pinimg.com/280x280_RS/01/6a/45/016a45c595efdc6d97c7fbc5a562f78b.jpg' />
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
              1 MB (3,258,385 bytes)
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
            <Button variant='plain' size='sm' endDecorator={<EditRounded />}>
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
              <Chip variant='outlined' startDecorator={<ShareRounded />}>
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
              <Chip variant='outlined' startDecorator={<EditRounded />}>
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
              <Chip variant='outlined' startDecorator={<EditRounded />}>
                Added 5 Apr 2021
              </Chip>
              <Typography level='body-xs' sx={{ mt: 1 }}>
                12 Apr 2021
              </Typography>
            </div>
          </Box>
        </TabPanel>
      </Tabs>
    </Sheet>
  );
};

export default FileInfo;
