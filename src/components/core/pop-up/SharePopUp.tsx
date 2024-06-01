import { SharedUsersSearchREQ } from '@/apis/user/storage/request/share.request';
import { shareFileAPi, sharedUserApi } from '@/apis/user/storage/storage.api';
import { useDebounce } from '@/hooks/useDebounce';
import { useTheme } from '@/providers/theme-provider';
import { toastSuccess } from '@/utils/toast-options/toast-options';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Autocomplete,
  Chip,
  DialogActions,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  SelectChangeEvent,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ButtonSuccess from '../button/ButtonSuccess';
import CustomDropdown from '../drop-down/CustomDropdown';
import CustomSelect from '../drop-down/CustomSelect';
import { MenuItem as MenuItemCustom } from '../drop-down/Dropdown';
import ListPeople from '../list-people/ListPeople';
import PopUp from './PopUp';
import { getEntryMetadata } from '@/apis/drive/drive.api';
import { GeneralAccessType } from '@/utils/types/general-access.type';
import { GeneralAccess } from '@/utils/constants/general-access.constant';
import { useUpdateGeneralAccessMutation } from '@/hooks/drive.hooks';

type SharePopUpProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  fileId: string;
};

type UserOption = {
  name: string;
  email: string;
  avatar?: string;
};

const fakeUsers: UserOption[] = [
  { name: 'Johssn Doe', email: 'johndoe@gmail.com' },
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

// const typeShareItems = ['Viewer', 'Editor', 'Owner'];
const typeShareItems = ['Viewer', 'Editor'];

const SharePopUp: React.FC<SharePopUpProps> = ({ open, handleClose, title, fileId }) => {
  const [values, setValues] = React.useState([]);
  const [typeShare, setTypeShare] = React.useState('Viewer');
  const [typeView, setTypeView] = React.useState(fakelistPeople.map((item) => item.type));
  const [isPublic, setIsPublic] = React.useState(false);
  const [generalAccess, setGeneralAccess] = React.useState<GeneralAccessType>(GeneralAccess.RESTRICTED as GeneralAccessType);
  const [keyword, setKeyword] = useState<string>('');
  const searchValue = useDebounce({ delay: 500, value: keyword });
  const [apiData, setApiData] = useState<UserOption[]>([]);
  const [errror, setError] = useState<boolean>(false);
  const { theme } = useTheme();

  const updateGeneralAccess = useUpdateGeneralAccessMutation();
  const shareFileMutation = useMutation({
    mutationFn: () => {
      return shareFileAPi({
        emails: values,
        id: fileId,
        role: typeShare.toLowerCase() as 'viewer' | 'editor',
      });
    },
    onError: (error) => {},
    onSuccess: (data) => {
      handleClose();
      toast.success('Share file successfully', toastSuccess());
    },
  });
  const sharedUsersMutation = useMutation({
    mutationFn: (param: SharedUsersSearchREQ) => {
      return sharedUserApi(param);
    },
    onError: (error) => {
      setApiData([]);
    },
    onSuccess: (data) => {
      const mappedData = data.data.map(
        (item, index) =>
          ({ email: item.email, name: item.first_name + ' ' + item.last_name, avatar: item.avatar_url }) as UserOption,
      );
      setApiData(mappedData);
    },
  });
  const { data, error, isFetching } = useQuery({
    queryKey: ['get-file-metadata-for-share', fileId],
    queryFn: () => getEntryMetadata({ id: fileId }),
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
  });

  useEffect(() => {
    sharedUsersMutation.mutateAsync({ query: searchValue });
  }, [searchValue]);

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
            options={apiData.map((option) => option.email)}
            onInputChange={(event, newInputValue) => setKeyword(newInputValue)}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant='outlined'
                  label={option}
                  {...getTagProps({ index })}
                  key={index}
                  sx={{
                    '.dark &': {
                      color: 'white',
                      '& .MuiChip-deleteIcon': {
                        color: 'white',
                      },
                    },
                  }}
                />
              ))
            }
            value={values}
            onChange={(_, newValue) => {
              setValues(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                placeholder='Favorites'
                sx={{
                  maxHeight: '90px',
                  overflowY: 'auto',
                }}
              />
            )}
          />
          {values.length > 0 && (
            <CustomSelect
              value={typeShare}
              onChange={(event: SelectChangeEvent<unknown>, _) => setTypeShare(event.target.value as string)}>
              {typeShareItems.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomSelect>
          )}
        </div>
        <div>
          {errror && <p className='text-red-600'>Please select people to share file.</p>}
          <div className='my-2'>
            <div className='text-base font-semibold'>People with access</div>
            <ListPeople fileId={fileId} height='150px' />
          </div>
          <div>
            <div className='text-base font-semibold'>General access</div>
            <ListItem
              alignItems='center'
              className='cursor-pointer hover:bg-gray-100 dark:hover:bg-blue-950'
              sx={{
                py: 1,
              }}>
              <ListItemAvatar>
                <Icon
                  icon='material-symbols:lock-outline'
                  className='h-8 w-8 rounded-full bg-gray-200 px-1.5 text-xl dark:text-dashboard-dark'
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <CustomSelect
                    value={generalAccess}
                    variant='outlined'
                    onChange={(e) => {
                      updateGeneralAccess.mutateAsync({ id: fileId, general_access: e.target.value as GeneralAccessType}, {
                        onSuccess: () => setGeneralAccess(e.target.value as GeneralAccessType),
                      });
                    }}
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
                    <MenuItem value={GeneralAccess.RESTRICTED}>Restricted</MenuItem>
                    <MenuItem value={GeneralAccess.PUBLIC_VIEW}>Everyone can view</MenuItem>
                    <MenuItem value={GeneralAccess.PUBLIC_EDIT}>Everyone can edit</MenuItem>
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
      </div>
      <DialogActions
        sx={{
          justifyContent: 'space-between',
        }}>
        <ButtonSuccess onClick={handleClose} type='button'>
          <Icon icon='material-symbols:link' className='mr-1 text-xl' />
          <span>Copy link</span>
        </ButtonSuccess>
        <ButtonSuccess
          onClick={() => {
            if (values.length <= 0) {
              setError(true);
            } else {
              setError(false);
              shareFileMutation.mutateAsync();
            }
          }}
          type='submit'>
          Share
        </ButtonSuccess>
      </DialogActions>
    </PopUp>
  );
};

export default SharePopUp;
