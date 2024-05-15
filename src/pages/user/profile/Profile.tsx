import { useSession } from '@/store/auth/session';
import { AUTH_CHANGE_PASSWORD } from '@/utils/constants/router.constant';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type ProfileProps = {
  avt_url: string;
  name: string;
  email: string;
  last_password_change: Date;
};

export const Profile: React.FC<ProfileProps> = () => {
  const { identity } = useSession();
  const name = identity.first_name + ' ' + identity.last_name;
  const navigate = useNavigate();

  const handleChangeName = (id, oldName) => {
    const newName = prompt('New Name:', oldName);
    console.log('[Profile.tsx] handleChangeName newName:', newName);
    if (newName == null || newName == '') {
      return;
    }
    // renameMutation.mutate({ id, name: newName });
  };

  const handleChangePassword = () => {
    navigate(AUTH_CHANGE_PASSWORD);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Ho_Chi_Minh',
    });
  };

  return (
    <div className='flex flex-col items-center bg-white'>
      <div className='flex flex-col items-center p-[24px]'>
        <div className='mb-[8px] '>Profile info</div>
        <div className=''>Info about you</div>
      </div>
      <div className='mx-[12px] mt-[24px] flex w-[864px] flex-col rounded-[8px] border'>
        <div className='p-[24px] pb-[8px]'>
          <div className=''>Basic info</div>
        </div>
        <div className='flex cursor-pointer items-center border-t pb-[16px] pl-[24px] pr-[24px] pt-[15px] hover:bg-[#ededed]'>
          <div className='flex w-full items-center'>
            <div className='mr-[24px] flex basis-[156px] pt-[4px]  font-medium'>Profile picture</div>
            <div className='pt-[4px] '>A profile picture helps you personalize your account</div>
          </div>
          <div className='relative ml-[16px]'>
            <Avatar about='profile picture' src={identity.avatar_url} sx={{ width: 60, height: 60 }} />
            <Icon icon='mdi:camera' className='absolute bottom-0 right-0 h-[20px] w-[20px] rounded-full bg-white' />
          </div>
        </div>
        <div
          className='flex cursor-pointer items-center border-t pb-[16px] pl-[24px] pr-[24px] pt-[15px] hover:bg-[#ededed]'
          onClick={() => handleChangeName(identity.id, name)}>
          <div className='flex w-full items-center'>
            <div className='mr-[24px] flex basis-[156px] pt-[4px]  font-medium'>Name</div>
            <div className='pt-[4px]'>{identity.first_name + ' ' + identity.last_name}</div>
          </div>
          <div className='relative ml-[24px] h-[30px] w-[30px]'>
            <Icon icon='mdi:keyboard-arrow-right' className='h-full w-full' />
          </div>
        </div>
        <div className='flex items-center border-t pb-[16px] pl-[24px] pr-[24px] pt-[15px]'>
          <div className='flex w-full items-center'>
            <div className='mr-[24px] flex basis-[156px] pt-[4px]  font-medium'>Email</div>
            <div className='pt-[4px]'>{identity.email}</div>
          </div>
        </div>
        <div
          className='flex cursor-pointer items-center border-t pb-[16px] pl-[24px] pr-[24px] pt-[15px] hover:bg-[#ededed]'
          onClick={() => handleChangePassword()}>
          <div className='flex w-full items-center'>
            <div className='mr-[24px] flex basis-[156px] pt-[4px]  font-medium'>Password</div>
            <div className='pt-[4px]'>{'Last changed at ' + formatDate(new Date(identity.password_changed_at))} </div>
          </div>
          <div className='relative ml-[24px] h-[30px] w-[30px]'>
            <Icon icon='mdi:keyboard-arrow-right' className='h-full w-full' />
          </div>
        </div>
      </div>
    </div>
  );
};
