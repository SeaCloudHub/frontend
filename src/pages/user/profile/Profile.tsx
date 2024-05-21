import ChangePasswordPopUp from '@/components/core/pop-up/ChangePasswordPopUp';
import ChangePhotoPopUp from '@/components/core/pop-up/ChangePhotoPopUp';
import RenameProfilePopUp from '@/components/core/pop-up/RenameProfilePopUp';
import DriveLayout from '@/components/layout/DriveLayout';
import { useProfile } from '@/hooks/auth.hooks';
import { useSession } from '@/store/auth/session';
import { AUTH_CHANGE_PASSWORD } from '@/utils/constants/router.constant';
import { formatDate } from '@/utils/function/formatDate.function';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ProfileProps = {
  avt_url: string;
  name: string;
  email: string;
  last_password_change: Date;
};

export const Profile: React.FC<ProfileProps> = () => {
  const [open, setOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const { identity } = useSession();
  const navigate = useNavigate();
  const {data, isLoading, error} = useProfile();

  return (
    <>
      <DriveLayout
        bodyLeft={
          <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center gap-2'>
              <div className='text-2xl'>Profile info</div>
              <div className='text-lg'>Info about you</div>
            </div>
            <div className='flex flex-col rounded-lg border mt-10'>
              <div className='text-2xl mx-5 mt-5'>Basic info</div>
              <div className='grid grid-cols-7 cursor-pointer items-center px-5 py-4 hover:bg-gray-200 active:brightness-90 dark:hover:bg-slate-500'
                onClick={() => setOpen(true)}
              >
                <div className='font-medium col-span-2'>Profile picture</div>
                <div className='col-span-4'>Add a profile photo to personalize your account</div>
                <div className='col-span-1 mx-auto'>
                  <div className='relative w-fit rounded-full overflow-hidden'>
                    <Avatar about='profile picture' src={data?.avatar_url} sx={{ width: 60, height: 60 }} />
                    <div className='absolute h-6 bottom-0 w-full blur-sm bg-gray-500'></div>
                    <div className='h-5 absolute bottom-0 w-full bg-transparent'>
                      <Icon icon='mdi:camera' className='h-5 w-5 brightness-95 text-white mx-auto' />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='grid grid-cols-7 cursor-pointer items-center border-t px-5 py-4 hover:bg-gray-200 active:brightness-90 dark:hover:bg-slate-500'
                onClick={() => {
                  setRenameOpen(true);
                }}>
                <div className='font-medium col-span-2'>Name</div>
                <div className='col-span-4'>{data?.first_name + ' ' + data?.last_name}</div>
                <div className='col-span-1 mx-auto'>
                  <Icon icon='mdi:keyboard-arrow-right' className='h-6 w-6' />
                </div>
              </div>
              <div className='grid grid-cols-7 items-center border-t  px-5 py-4 hover:bg-gray-200 active:brightness-90 dark:hover:bg-slate-500'>
                <div className='col-span-2 font-medium'>Email</div>
                <div className='col-span-4'>{data?.email}</div>
              </div>
              <div
                className='grid grid-cols-7 cursor-pointer items-center border-t px-5 pt-4 pb-5 hover:bg-gray-200 active:brightness-90 dark:hover:bg-slate-500'
                onClick={() => setChangePasswordOpen(true)}
              >
                <div className='font-medium col-span-2'>Password</div>
                <div className='col-span-4'>{'Last changed at ' + formatDate(new Date(data?.password_changed_at))} </div>
                <div className='mx-auto'>
                  <Icon icon='mdi:keyboard-arrow-right' className='h-6 w-6' />
                </div>
              </div>
            </div>
          </div>
        }
        headerLeft={<></>}
      />
      {open && <ChangePhotoPopUp open={open} handleClose={() => setOpen(false)} setResult={() => {}} />}
      {renameOpen && <RenameProfilePopUp open={renameOpen} handleClose={() => setRenameOpen(false)} values={{
          first_name: identity.first_name,
          last_name: identity.last_name,
        }}/>}
      {changePasswordOpen &&
        <ChangePasswordPopUp open={changePasswordOpen} handleClose={() => setChangePasswordOpen(false)} />
      }
    </>
  );
};
