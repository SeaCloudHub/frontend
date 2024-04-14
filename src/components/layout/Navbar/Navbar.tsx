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
      <header className='relative flex  w-screen items-center justify-between py-2  pl-3 pr-5'>
        {phoneMode && (
          <div className='flex h-full duration-500'>
            <ButtonIcon icon={'radix-icons:hamburger-menu'} size={'100%'} />
          </div>
        )}
        <Search />

        <div onClick={() => {}} className='rounded-full0 ml-3 flex h-full cursor-pointer items-center overflow-hidden'>
          {!phoneMode && <Configuration />}
          <img
            onClick={() => {
              setShowUserInfo(true);
            }}
            src={'https://student.hcmus.edu.vn/_next/image?url=%2Fhcmus-logo.png&w=384&q=75'}
            className='h-[70%] rounded-full object-center  p-1.5 hover:bg-gray-100'
            draggable={false}
            alt='avatar'
          />
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
