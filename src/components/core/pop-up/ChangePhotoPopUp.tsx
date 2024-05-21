import React from 'react';
import PopUp from './PopUp';
import { Avatar, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {Close} from '@mui/icons-material';
import {AddAPhoto, Done} from '@mui/icons-material';

type ChangePhotoPopUpProps = {
  open: boolean;
  handleClose: () => void;
  setResult: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangePhotoPopUp: React.FC<ChangePhotoPopUpProps> = ({handleClose, open, setResult}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState<string>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <PopUp open={open} handleClose={handleClose}>
      <div className='min-w-[400px] max-w-[450px] select-none'>
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
            <Avatar sx={{ width: 200, height: 200 }} src={image} />
          </div>
          <input
            type='file'
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
          <Button variant='contained'
            color='primary'
            onClick={(e)=>{
              !image ?  inputRef.current?.click() : handleClose();
            }}
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
      </div>
    </PopUp>
  );
};

export default ChangePhotoPopUp;