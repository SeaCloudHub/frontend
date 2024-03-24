import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Avatar from '@mui/joy/Avatar';
import Input from '@mui/joy/Input';
import MenuButton from '@mui/joy/MenuButton';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import React, { useState } from 'react';
import { ColorSchemeToggle } from '../core/button/ColorSchemeToggle';
import { DropDownMenu } from '../core/drop-down/DropDownMenu';

interface HeaderProps {
  userName: string;
  userAvatar: string;
  userEmail: string;
}

const menuItems = {
  user: [
    { icon: <HelpRoundedIcon />, label: 'Help' },
    { icon: <SettingsRoundedIcon />, label: 'Settings' },
    { icon: <LogoutRoundedIcon />, label: 'Log out' },
  ],
};

const Header: React.FC<HeaderProps> = ({ userName, userAvatar, userEmail }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex h-16 w-full flex-row py-2'>
      <div className='flex w-64 flex-row items-center space-x-4 px-4'>
        <LanguageRoundedIcon />
        <Typography level='title-sm' textColor='text.primary'>
          SEEEWEED
        </Typography>
      </div>
      <div className='flex grow'>
        <div className='flex max-w-[800px] grow'>
          <Input
            variant='outlined'
            placeholder='Search anything…'
            startDecorator={<SearchRoundedIcon />}
            endDecorator={
              <IconButton variant='outlined' color='neutral' disabled sx={{ bgcolor: 'background.level1' }}>
                <Typography level='title-sm' textColor='text.icon'>
                  Ctrl K
                </Typography>
              </IconButton>
            }
            sx={{
              width: 1,
            }}
          />
        </div>
      </div>
      <div className='flex flex-row items-center justify-between space-x-4 px-4'>
        <ColorSchemeToggle />
        <div className='flex flex-col'>
          <div>
            <Typography level='title-sm' textColor='text.primary'>
              {userName}
            </Typography>
          </div>
          <div>
            <Typography level='body-xs' textColor='text.tertiary'>
              {userEmail}
            </Typography>
          </div>
        </div>
        <DropDownMenu
          button={
            <MenuButton
              variant='plain'
              size='sm'
              sx={{
                maxWidth: '32px',
                maxHeight: '32px',
                borderRadius: '9999999px',
              }}>
              <Avatar src={userAvatar} sx={{ maxWidth: '32px', maxHeight: '32px' }} />
            </MenuButton>
          }
          menuItems={menuItems.user}
        />
        {/* <Dropdown>
          <Menu
            placement='bottom-end'
            size='sm'
            sx={{
              zIndex: '99999',
              p: 1,
              gap: 1,
              '--ListItem-radius': 'var(--joy-radius-sm)',
            }}>
            <MenuItem>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Avatar
                  src='https://i.pravatar.cc/40?img=2'
                  srcSet='https://i.pravatar.cc/80?img=2'
                  sx={{ borderRadius: '50%' }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level='title-sm' textColor='text.primary'>
                    Rick Sanchez
                  </Typography>
                  <Typography level='body-xs' textColor='text.tertiary'>
                    rick@email.com
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <HelpRoundedIcon />
              Help
            </MenuItem>
            <MenuItem>
              <SettingsRoundedIcon />
              Settings
            </MenuItem>
            <ListDivider />
            <MenuItem component='a' href='/blog/first-look-at-joy/'>
              First look at Joy UI
              <OpenInNewRoundedIcon />
            </MenuItem>
            <MenuItem
              component='a'
              href='https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/email'>
              Sourcecode
              <OpenInNewRoundedIcon />
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <LogoutRoundedIcon />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown> */}
      </div>
    </div>
  );
};

export default Header;
