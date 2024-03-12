import { UserCircleIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

function Header() {
  const [displayUserInfo, setDisplayUserInfo] = useState(false);
  // const { data: session } = useSession();
  // if (session === null) {
  //   // signIn();
  // }
  const session = true;
  return (
    <header className='relative flex h-16 w-screen items-center justify-between border-b-2 px-5 py-2'>
      <div className='tablet:w-60 w-16 pl-1 duration-500'>
        <a href={'/'} className='flex w-fit items-center space-x-2 p-1'>
          <img
            src='/logo.png'
            width={500}
            height={500}
            alt='logo'
            className='h-10 w-10 object-contain object-center'
            draggable={false}
          />
          <h1 className='text-textC tablet:block hidden text-2xl tracking-tight'>Drive</h1>
        </a>
      </div>
      {/* search */}
      {/* <Search /> */}
      <div>Search</div>
      <div
        onClick={() => {
          // session ? setDisplayUserInfo((prev) => !prev) : signIn();
        }}
        className='ml-3 h-8 w-8 cursor-pointer overflow-hidden rounded-full'>
        {session ? (
          <img
            src='https://i.pinimg.com/280x280_RS/01/6a/45/016a45c595efdc6d97c7fbc5a562f78b.jpg'
            className='h-full w-full rounded-full object-center'
            height={500}
            width={500}
            draggable={false}
            alt='avatar'
          />
        ) : (
          <UserCircleIcon className='h-full w-full' />
        )}
      </div>
      <div className='absolute right-5 top-16'>
        <div>User Info</div>
        {/* {session && displayUserInfo && <UserInfo setDisplayUserInfo={setDisplayUserInfo} />} */}
      </div>
    </header>
  );
}

export default Header;
