import { signOutApi } from '@/apis/auth/auth.api';
import { useSession } from '@/store/auth/session';
import { useProgressIndicator } from '@/store/storage/progressIndicator.store';
import { AUTH_LOGIN_EMAIL, DRIVE_PROFILE } from '@/utils/constants/router.constant';
import { Role } from '@/utils/enums/role.enum';
import { getFirstCharacters } from '@/utils/function/getFirstCharacter';
import { getRandomColor } from '@/utils/function/getRandomColor';
import { toastError } from '@/utils/toast-options/toast-options';
import { ApiGenericError } from '@/utils/types/api-generic-error.type';
import { LinearProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRef } from 'react';
import { useCookies } from 'react-cookie';
import { AiOutlineClose } from 'react-icons/ai';
import { PiSignOutBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type UserInfoProps = {
  onClose: () => void;
};
function UserInfo({ onClose }: UserInfoProps) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token','role']);
  const { signOut, identity } = useSession();
  const reset = useProgressIndicator((state) => state.reset);
  const modalRef = useRef(null);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await signOutApi();
    },
    onError: (error) => {
      if (isAxiosError<ApiGenericError>(error)) {
        toast.error(error.response?.data.message, toastError());
      }
    },
    onSuccess: () => {
      signOut();
      reset();
      removeCookie('token', { path: '/' });
      removeCookie('role', { path: '/' });
      setTimeout(() => {
        navigate(AUTH_LOGIN_EMAIL);
      }, 0);
    },
  });

  const onSignOutClick = () => {
    logoutMutation.mutate();
  };

  const onUserProfileClick = () => {
    modalRef.current.style.display = 'none';
    navigate(DRIVE_PROFILE);
  };

  return (
    <div
      ref={modalRef}
      className='bg-darkC2 z-100 relative z-10 flex max-w-[250px] select-none flex-col items-center justify-center space-y-3 rounded-2xl bg-white px-5 py-3 text-sm font-medium shadow-md shadow-[#b4bebb] dark:bg-dashboard-dark dark:text-white'>
      <button onClick={onClose} className='bg-darkC2 hover:bg-dark absolute right-3 top-3 rounded-full p-1'>
        <AiOutlineClose className='h-5 w-5 rounded-full stroke-2' />
      </button>
      <p className=' w-full truncate px-5 text-center '> {identity.email} </p>
      <div className='h-20 w-20 rounded-full border'>
        {identity && identity.avatar_url && (
          <img
            src={import.meta.env.VITE_BACKEND_API + identity.avatar_url}
            className='h-full w-full rounded-full object-center'
            height={500}
            width={500}
            draggable={false}
            alt='avatar'
          />
        )}
        {identity && !identity.avatar_url && (
          <div
            className='round flex h-full w-full items-center justify-center rounded-full'
            style={{ backgroundColor: getRandomColor() }}>
            <p className='statement-bold truncate'>{getFirstCharacters(identity.first_name + ' ' + identity.last_name || '')}</p>
          </div>
        )}
      </div>
      <h2 className='tablet:text-2xl w-full truncate text-center text-xl font-normal'>{`Hi, ${identity.first_name}!`}</h2>

      <div className='flex flex-col items-center justify-center'>
        {cookies.role == Role.USER && (
          <button
            onClick={onUserProfileClick}
            className='tablet:w-44 hover:bg-darkC flex w-48 items-center justify-center space-x-2 rounded-full border bg-white py-3  hover:bg-gray-200 dark:text-black'>
            <span className='text-[#2e6ed6]'>Manage your account</span>
          </button>
        )}
        <button
          disabled={logoutMutation.isPending}
          onClick={onSignOutClick}
          className='tablet:w-44 hover:bg-darkC mt-2 flex w-36 items-center justify-center space-x-2 rounded-full  py-3 hover:bg-gray-300  dark:text-white hover:dark:bg-slate-800'>
          <PiSignOutBold className='h-6 w-6' />
          <span>Sign out</span>
        </button>
      </div>
      {logoutMutation.isPending && <LinearProgress className=' w-full translate-y-1' />}
    </div>
  );
}

export default UserInfo;
