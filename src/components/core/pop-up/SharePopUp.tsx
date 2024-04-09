import React from 'react';
import PopUp from './PopUp';
import { Autocomplete, Avatar, Chip, DialogActions, Input, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import Dropdown, { MenuItem as MenuItemCustom } from '../drop-down/Dropdown';
import ListPeople from '../list-people/ListPeople';
import ButtonContainer from '../button/ButtonContainer';

type SharePopUpProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
};

type UserOption = {
  name: string;
  email: string;
  avatar?: string;
};

const fakeUsers: UserOption[] = [
  { name: 'John Doe', email: 'johndoe@gmail.com' },
  { name: 'John Doe1', email: 'johndoe1@gmail.com' },
  { name: 'John Doe2', email: 'johndoe2@gmail.com' },
  { name: 'John Doe3', email: 'johndoe3@gmail.com' },
  { name: 'John Doe4', email: 'johndoe4@gmail.com' },
  { name: 'John Doe5', email: 'johndoe5@gmail.com' },
  { name: 'John Doe6', email: 'johndoe6@gmail.com' },
];

const fakelistPeople = fakeUsers.map((user) => ({
  name: user.name,
  email: user.email,
  type: 'Viewer' as 'Viewer' | 'Editor' | 'Owner',
}));

const helpItems: MenuItemCustom[] = [
  {icon:null, label: 'Help', action: () => {}},
  {icon:null, label: 'Report', action: () => {}},
];

const typeShareItems = [
  'Viewer',
  'Editor',
  'Owner',
]

const SharePopUp: React.FC<SharePopUpProps> = ({
  open,
  handleClose,
  title,
})  => {
  const [values, setValues] = React.useState([]);
  const [typeShare, setTypeShare] = React.useState('Viewer');
  const [typeView, setTypeView] = React.useState(fakelistPeople.map((item) => item.type));
  const [isPublic, setIsPublic] = React.useState(false);

  return (
    <PopUp open={open} handleClose={handleClose}>
      <div className='flex justify-between items-center m-3 mb-0'>
        <Tooltip title={title} >
          <span className='text-xl font-semibold line-clamp-1 overflow-hidden'> Share {title} </span>
        </Tooltip>
        <Dropdown button={
          <Icon icon='material-symbols:help-outline' className='text-xl' />
        } items={[helpItems]} left={true} />
      </div>
      <div className='h-[360px] lg:w-[580px] md:w-[500px] p-3'>
        <div className={values.length>0 ? 'flex gap-3 justify-between items-start': ''}>
          <Autocomplete
            multiple
            id="tags-filled"
            className={`${values.length>0 ? 'w-[calc(100%-40px)]':'w-full'} min-w-60`}
            options={fakeUsers.map((option) => option.email)}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />
              ))
            }
            value={values}
            onChange={(_, newValue) => {
              setValues(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Favorites"
              />
            )}
          />
          {values.length>0 && (
            <Select value={typeShare} onChange={(e) => setTypeShare(e.target.value as string) }>
              {typeShareItems.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
        <div className='my-2'>
          <div className='text-base font-semibold'>People with access</div>
          <ListPeople items={fakelistPeople} state={typeView} setState={setTypeView} height='150px'/>
        </div>
        <div>
          <div className='text-base font-semibold'>General access</div>
          <ListItem alignItems="center" className='hover:bg-gray-100' sx={{
            py: 1,
          }}>
            <ListItemAvatar>
              <Icon icon='material-symbols:lock-outline' className='text-xl rounded-full bg-gray-200 w-8 h-8 px-1.5' />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Select value={isPublic} variant='outlined'
                  onChange={
                    (e) => setIsPublic(e.target.value === 'true')
                  } sx={{
                    fontSize: '0.875rem',
                    '& fieldset': {
                      border: 'none',
                    },
                    '& .MuiSelect-select': {
                      padding: '2px',
                    },
                    '&:hover': {
                      backgroundColor: '#f3f4f6',
                    },
                  }}
                >
                  <MenuItem value={'true'}>Anyone with the link</MenuItem>
                  <MenuItem value={'false'}>Only people added can open</MenuItem>
                </Select>
              }
              secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="gray"
                  >
                    Anyone on the internet with this link can view
                  </Typography>
              }
            />
          </ListItem>
        </div>
      </div>
      <DialogActions sx={{
        justifyContent: 'space-between',
      }}>
        <ButtonContainer
          icon={ <Icon icon='material-symbols:link' className='text-xl' /> }
          background='blue' backgroundhover='red' title='Coppy Link' onClick={()=>{}}/>
        <ButtonContainer
          background='blue' backgroundhover='red' title='Finished' onClick={()=>{}}/>
      </DialogActions>
    </PopUp>
  );
};

export default SharePopUp;
