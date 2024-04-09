import { Avatar, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';

export type PeopleItemProps = {
  name: string;
  email: string;
  avatar?: string;
  value: 'Viewer' | 'Editor' | 'Owner';
  setValue: (value: string) => void;
};

const PeopleItem: React.FC<PeopleItemProps> = ({
  name,
  email,
  avatar,
  value,
  setValue,
}) => {
  return (
    <ListItem alignItems="center" className='hover:bg-gray-100'>
      <ListItemAvatar>
        <Avatar alt={name} src={avatar||'https://picsum.photos/200/300'} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="gray"
            >
              {email}
            </Typography>
          </React.Fragment>
        }
      />
      <Select variant='outlined' sx={{
        '& fieldset': {
            border: 'none',
          },
          '& .MuiSelect-select': {
            padding: '10px',
          },
          '&:hover': {
            backgroundColor: '#f3f4f6',
          },
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}>
          <MenuItem value='Viewer'>Viewer</MenuItem>
          <MenuItem value='Editor'>Editor</MenuItem>
          <MenuItem value='Owner'>Owner</MenuItem>
      </Select>
    </ListItem>
  );
};

export default PeopleItem;