import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

import { FolderIcon, ShareIcon, TrashIcon } from '@heroicons/react/16/solid';

export default function Navigation() {
  return (
    <List size='sm' sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>Browse</ListSubheader>
        <List
          aria-labelledby='nav-list-browse'
          sx={{
            '& .JoyListItemButton-root': { p: '8px' },
          }}>
          <ListItem>
            <ListItemButton selected>
              <ListItemDecorator>
                <div className='mr-1 h-full w-full'>
                  <FolderIcon />
                </div>
              </ListItemDecorator>
              <ListItemContent>My Drive</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <div className='mr-1 h-full w-full'>
                  <ShareIcon />
                </div>
              </ListItemDecorator>
              <ListItemContent>Shared Drive</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <div className='mr-1 h-full w-full'>
                  <TrashIcon />
                </div>
              </ListItemDecorator>
              <ListItemContent>Trash</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
