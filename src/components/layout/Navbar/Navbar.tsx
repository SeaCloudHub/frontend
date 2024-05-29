import { useSession } from '@/store/auth/session';
import { getFirstCharacters } from '@/utils/function/getFirstCharacter';
import { getRandomColor } from '@/utils/function/getRandomColor';
import { useEffect, useRef, useState } from 'react';
import ButtonIcon from '../../core/button/ButtonIcon';
import Configuration from './Configuration';
import Search from './Search';
import UserInfo from './UserInfo';

type NavbarProps = {
  isShrink: boolean;
  phoneMode: boolean;
};

const Navbar = ({ isShrink, phoneMode }: NavbarProps) => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const userInfoRef = useRef(null);
  const identity = useSession((state) => state.identity);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
        setShowUserInfo(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`z-20 ${phoneMode ? '!important pl-0' : ''} nav-bar  ${isShrink ? 'nav-bar-shrink' : ''}`}>
      <header className='relative  flex w-screen items-center justify-between  py-1 pl-3 pr-5'>
        {phoneMode && (
          <div className='flex h-full duration-500'>
            <ButtonIcon icon={'radix-icons:hamburger-menu'} size={'1.4rem'} />
          </div>
        )}
        <Search />
        <div onClick={() => {}} className='ml-3  flex h-full  cursor-pointer items-center overflow-hidden rounded-full '>
          {!phoneMode && <Configuration />}
          {identity && identity.avatar_url && (
            <img
              onClick={() => {
                setShowUserInfo(true);
              }}
              src={import.meta.env.VITE_BACKEND_API + identity.avatar_url}
              className='h-10 w-10 rounded-full border-2 border-red-300 object-contain  p-1'
              draggable={false}
              alt='avatar'
            />
          )}
          {identity && !identity.avatar_url && (
            <div
              onClick={() => setShowUserInfo(true)}
              className=' flex h-10 w-10 items-center justify-center rounded-full  border-2 border-red-300 '
              style={{ backgroundColor: getRandomColor() }}>
              <p className='statement-bold truncate'>
                {getFirstCharacters(identity.first_name + ' ' + identity.last_name || '')}
              </p>
            </div>
          )}
        </div>
        {showUserInfo && (
          <div ref={userInfoRef} className='z-100 absolute right-5 top-16'>
            <UserInfo
              onClose={() => {
                setShowUserInfo(false);
              }}
            />
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
