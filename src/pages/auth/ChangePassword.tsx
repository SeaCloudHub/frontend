import IconifyIcon from '../../components/core/Icon/IConCore';
import TextFieldCore from '../../components/core/form/TextFieldCore';
import { Button, Paper, Typography } from '@mui/material';
// import React from 'react';

const ChangePassword = () => {
  return (
    <div className='mx-10 text-gray-600 sm:mx-20 md:mx-40 lg:mx-[300px] xl:mx-[550px]'>
      <IconifyIcon icon='logos:google' className='mx-auto h-20 w-40' />
      <div className='title text-center text-2xl '>Change password for</div>
      <div className='email text-center text-2xl'>kimhieu@gmail.com</div>
      <div className='help'></div>
      <Paper
        component={'form'}
        onSubmit={() => {}}
        className='paper mt-5 border'
        elevation={3}
        sx={{ backgroundColor: '#f7f7f7', py: 5, px: 6 }}>
        <IconifyIcon icon='ic:baseline-lock-reset' className='mx-auto my-4 h-24 w-56 text-blue-600' />
        <div className='text line-clamp-2 overflow-hidden'>
          Create a new, strong password that you don't use for other websites
        </div>
        <div className='form mt-5 flex flex-col gap-3'>
          <div className='create-password'>
            <Typography
              className='label'
              fontWeight={{
                fontWeight: 600,
              }}>
              Create password
            </Typography>
            <TextFieldCore name={'password'} />
          </div>
          <div className='confirm-password'>
            <Typography
              className='label'
              fontWeight={{
                fontWeight: 600,
              }}>
              Confirm password
            </Typography>
            <TextFieldCore name={'confirmPassword'} />
          </div>
          <Button type='submit' className='btn' fullWidth variant='contained' size='large'>
            Change password
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ChangePassword;
