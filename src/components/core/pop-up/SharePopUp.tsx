import React from 'react';
import PopUp from './PopUp';
import {
  Autocomplete,
  Avatar,
  Button,
  Chip,
  DialogActions,
  Input,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import Dropdown, { MenuItem as MenuItemCustom } from '../drop-down/Dropdown';
import ListPeople from '../list-people/ListPeople';
import ButtonContainer from '../button/ButtonContainer';
import CustomDropdown from '../drop-down/CustomDropdown';
import ButtonSuccess from '../button/ButtonSuccess';
import CustomSelect from '../drop-down/CustomSelect';
import { Textarea } from '@mui/joy';
import { useTheme } from '@/providers/theme-provider';

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
  { icon: null, label: 'Help', action: () => {} },
  { icon: null, label: 'Report', action: () => {} },
];

const typeShareItems = ['Viewer', 'Editor', 'Owner'];

const SharePopUp: React.FC<SharePopUpProps> = ({ open, handleClose, title }) => {
  const [values, setValues] = React.useState([]);
  const [typeShare, setTypeShare] = React.useState('Viewer');
  const [typeView, setTypeView] = React.useState(fakelistPeople.map((item) => item.type));
  const [isPublic, setIsPublic] = React.useState(false);
  const {theme} = useTheme();

  return (
    <PopUp open={open} handleClose={handleClose}>
      <div className='m-3 mb-0 flex items-center justify-between'>
        <Tooltip title={title}>
          <span className='line-clamp-1 overflow-hidden text-xl font-semibold'> Share {title} </span>
        </Tooltip>
        {/* <Dropdown button={
          <Icon icon='material-symbols:help-outline' className='text-xl' />
        } items={[helpItems]} left={true} /> */}
        <CustomDropdown button={<Icon icon='material-symbols:help-outline' className='text-xl' />} items={[helpItems]} />
      </div>
      <div className='h-[360px] p-3 md:w-[500px] lg:w-[580px]'>
        <div className={values.length > 0 ? 'flex items-start justify-between gap-3' : ''}>
          <Autocomplete
            sx={{
              '.dark &': {
                backgroundColor: '#031525',
                '& .MuiAutocomplete-inputRoot': {
                  backgroundColor: '#031525',
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '& .MuiAutocomplete-inputRoot:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                },
                '& .MuiAutocomplete-clearIndicator': {
                  color: 'white',
                },
              },
            }}
            multiple
            id='tags-filled'
            className={`${values.length > 0 ? 'w-[calc(100%-40px)]' : 'w-full'} min-w-60`}
            classes={{ listbox: 'dark:bg-slate-800 dark:text-white' }}
            options={fakeUsers.map((option) => option.email)}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip variant='outlined' label={option} {...getTagProps({ index })} key={index}
                  sx={{
                    '.dark &': {
                      color: 'white',
                      '& .MuiChip-deleteIcon': {
                        color: 'white',
                      },
                    },
                }}/>
              ))
            }
            value={values}
            onChange={(_, newValue) => {
              setValues(newValue);
            }}
            renderInput={(params) =>
              <TextField {...params}
                variant='outlined'
                placeholder='Favorites'
                sx={{
                  maxHeight: '90px',
                  overflowY: 'auto',
                }}
              />
            }
          />
          {values.length > 0 && (
            <CustomSelect
              value={typeShare}
              onChange={(event: SelectChangeEvent<unknown>, _) => setTypeShare(event.target.value as string)}
            >
              {typeShareItems.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomSelect>
          )}
        </div>
        {values.length > 0 ?
          <div>
            <TextareaAutosize placeholder='Add a message' minRows={10} maxRows={10}
            style={{
              border: `1px solid ${theme === 'dark' ? '#1E293B' : 'white'}`,
              borderRadius: '5px',
              color: 'white',
              width: '100%',
              resize: 'none',
              marginTop: '10px',
              backgroundColor: theme === 'dark' ? '#031525' : 'white',
            }}/>
          </div> :
          <div>
            <div className='my-2'>
              <div className='text-base font-semibold'>People with access</div>
              <ListPeople items={fakelistPeople} state={typeView} setState={setTypeView} height='150px' />
            </div>
            <div>
              <div className='text-base font-semibold'>General access</div>
              <ListItem
                alignItems='center'
                className='hover:bg-gray-100 dark:hover:bg-blue-950 cursor-pointer'
                sx={{
                  py: 1,

                }}>
                <ListItemAvatar>
                  <Icon icon='material-symbols:lock-outline' className='h-8 w-8 rounded-full bg-gray-200 dark:text-dashboard-dark px-1.5 text-xl' />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <CustomSelect
                      value={isPublic}
                      variant='outlined'
                      onChange={(e) => setIsPublic(e.target.value === 'true')}
                      sx={{
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
                      }}>
                      <MenuItem value={'true'}>Anyone with the link</MenuItem>
                      <MenuItem value={'false'}>Only people added can open</MenuItem>
                    </CustomSelect>
                  }
                  secondary={
                    <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='gray'>
                      Anyone on the internet with this link can view
                    </Typography>
                  }
                />
              </ListItem>
            </div>
          </div>
        }
      </div>
      <DialogActions
        sx={{
          justifyContent: 'space-between',
        }}>
        <ButtonSuccess onClick={handleClose} type='button'>
          <Icon icon='material-symbols:link' className='text-xl mr-1' />
          <span>Coppy link</span>
        </ButtonSuccess>
        <ButtonSuccess type='submit'>Finished</ButtonSuccess>
      </DialogActions>
    </PopUp>
  );
};

export default SharePopUp;
