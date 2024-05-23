import React from 'react';
import PopUp from './PopUp';
import { Avatar, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {Close} from '@mui/icons-material';
import {AddAPhoto, Done} from '@mui/icons-material';
import { useUpDateAvatarMutation } from '@/hooks/auth.hooks';
import { toast } from 'react-toastify';

type ChangePhotoPopUpProps = {
  open: boolean;
  handleClose: () => void;
  setResult: React.Dispatch<React.SetStateAction<boolean>>;
  name: {
    first_name: string;
    last_name: string;
  };
};

const ChangePhotoPopUp: React.FC<ChangePhotoPopUpProps> = ({handleClose, open, setResult, name}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState<File>();

  const uploadAvatar = useUpDateAvatarMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
  };

  const handleSubmit = () => {
    if (!image) {
      inputRef?.current?.click();
      return;
    }
    uploadAvatar.mutate({ image, first_name: name.first_name, last_name: name.last_name }, {
      onSuccess: () => {
        setResult(true);
        handleClose();
      },
    })
  }

  return (
    <PopUp open={open} handleClose={handleClose}>
      <form className='min-w-[400px] max-w-[450px] select-none' encType='multipart/form-data' onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <DialogTitle className='flex items-center'>
          <Close className='cursor-pointer absolute rounded-full left-4 transition-all hover:brightness-90 hover:bg-primaryContainer w-4 h-4 p-0.5 active:brightness-95' onClick={handleClose} />
          <div className='text-center w-full'>SeaCloudHub Account</div>
        </DialogTitle>
        <DialogContent className='max-h-[400px] overflow-y-auto'>
          <div className='text-lg'>Résume photo</div>
          <div className='text-sm text-slate-500'>A profile profile helps others recognize you and also helps you realize that you're signed in to an account.</div>
          <div className='flex justify-center mt-5'
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <Avatar sx={{ width: 200, height: 200 }} src={image ? URL.createObjectURL(image) : ''} />
          </div>
          <input
            type='file'
            name='image'
            accept={ 'image/png, image/jpeg, image/jpg' }
            className='w-full mt-5 hidden'
            ref={inputRef}
            onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions
          classes={{
            root: 'flex justify-center pb-5'
          }}
        >
          <Button
            variant='contained'
            {...uploadAvatar.isPending && {disabled: true}}
            // {...image && {type: 'submit'}}
            color='primary'
            onClick={handleSubmit}
            classes={{
              root: 'w-full rounded-full',
            }}
            sx={{
              textTransform: 'none',
              borderRadius: '9999px',
            }}
          >
            {!image ?
              <>
                <AddAPhoto className='mr-2' />
                <span>Change photo</span>
              </>:
              <>
                <Done className='mr-2' />
                <span>Save</span>
              </>
            }
          </Button>
        </DialogActions>
      </form>
    </PopUp>
  );
};

export default ChangePhotoPopUp;