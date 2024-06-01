import { useSession } from '@/store/auth/session';
import { Avatar, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';

export type PeopleItemProps = {
  name: string;
  email: string;
  avatar?: string;
  user_id: string;
  value: 'Viewer' | 'Editor' | 'Owner';
  setValue: (value: string) => void;
};

const PeopleItem: React.FC<PeopleItemProps> = ({ name, email, avatar, value, setValue, user_id }) => {
  const { identity } = useSession();
  return (
    <ListItem alignItems='center' className='cursor-pointer hover:bg-gray-100 dark:hover:bg-blue-950'>
      <ListItemAvatar>
        <Avatar alt={name} src={avatar || 'https://picsum.photos/200/300'} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='gray'>
              {email}
            </Typography>
          </React.Fragment>
        }
      />
      <Select
        disabled={user_id === identity.id }
        sx={{
          '& .MuiSelect-select': {
            padding: '10px',
          },
          '&:hover': {
            backgroundColor: '#f3f4f6',
          },
          '.dark &': {
            backgroundColor: '#031525',
            color: 'white',

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.25)',
            },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '& .MuiSelect-icon': {
              color: 'white',
            },
          },
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}>
        <MenuItem value='Viewer'>Viewer</MenuItem>
        <MenuItem value='Editor'>Editor</MenuItem>
        {user_id === identity.id && <MenuItem value='Owner'>Owner</MenuItem>}
      </Select>
    </ListItem>
  );
};

export default PeopleItem;
