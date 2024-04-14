import { useSession } from '@/store/auth/session';
import { AUTH_LOGIN_EMAIL } from '@/utils/constants/router.constant';
import { LinearProgress } from '@mui/material';
import { useRef, useState } from 'react'; // Import useRef and useEffect
import { AiOutlineClose } from 'react-icons/ai';
import { PiSignOutBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

type UserInfoProps = {
  onClose: () => void;
};
function UserInfo({ onClose }: UserInfoProps) {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);
  const signOut = useSession((state) => state.signOut);

  const modalRef = useRef(null);
  const onSignOutClick = async () => {
    setIsLogout(true);
    setTimeout(() => {
      signOut();
      setIsLogout(false);
      navigate(AUTH_LOGIN_EMAIL);
    }, 2000);
  };

  return (
    <div
      ref={modalRef}
      className='bg-darkC2  z-100 relative z-10 flex flex-col items-center justify-center space-y-3 rounded-2xl bg-white px-5 py-3 text-sm font-medium shadow-md shadow-[#b4bebb]'>
      <button onClick={onClose} className='bg-darkC2 hover:bg-dark absolute right-3 top-3 rounded-full p-1'>
        <AiOutlineClose className='h-5 w-5 rounded-full stroke-2' />
      </button>
      <p>'Phan Nhat trieu1'</p>
      <div className='h-20 w-20 rounded-full border'>
        <img
          src='https://student.hcmus.edu.vn/_next/image?url=%2Fhcmus-logo.png&w=384&q=75'
          className='h-full w-full rounded-full object-center'
          height={500}
          width={500}
          draggable={false}
          alt='avatar'
        />
      </div>
      <h2 className='tablet:text-2xl text-xl font-normal'>Hi, 'name'!</h2>
      <button disabled={isLogout} className='text-textC2 rounded-full border border-black px-7 py-2 hover:bg-[#d3dfee]'>
        Manage your Google Account
      </button>
      <div className='flex justify-center space-x-1'>
        <button
          disabled={isLogout}
          onClick={onSignOutClick}
          className='tablet:w-44 hover:bg-darkC flex w-36 items-center justify-center space-x-2 rounded-full bg-white py-3  hover:bg-gray-200'>
          <PiSignOutBold className='h-6 w-6' />
          <span>Sign out</span>
        </button>
      </div>
      <div className=' flex  h-10 items-center space-x-2  text-xs '>
        <span className='cursor-pointer rounded-full px-3 py-2 hover:bg-blue-100'>Privacy policy</span>
        <span className='-mt-[3px] '> . </span> <span className='rounded-full px-3 py-2 hover:bg-blue-100'>Terms of service</span>
      </div>
      {isLogout && <LinearProgress className=' w-full translate-y-1' />}
    </div>
  );
}

export default UserInfo;
