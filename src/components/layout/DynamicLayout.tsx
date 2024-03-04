import { PropsWithChildren, useEffect, useState } from 'react';
import { Role } from '../../utils/enums/role.enum';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DynamicLayout = ({ children }: PropsWithChildren) => {
  const onShrinkChange = (mode: boolean) => setShrink(mode);
  const [shrink, setShrink] = useState<boolean>(false);
  const [phoneMode, setPhoneMode] = useState<boolean>(false);
  const [role, setRole] = useState<Role>(Role.ADMIN);
  const pathName: string = 'Admin';
  useEffect(() => {
    const handleResize = () => {
      setPhoneMode(window.innerWidth <= 500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (pathName.startsWith('Admin')) {
      setRole(Role.ADMIN);
    }
    if (pathName.startsWith('User')) {
      setRole(Role.User);
    }
  }, [pathName]);
  return (
    <>
      <Navbar phoneMode={phoneMode} isShrink={shrink} />
      {!phoneMode && <Sidebar role={role} onShrinkChange={onShrinkChange} />}
      <div
        className={`content-default-mode p-3 ${shrink ? 'content-shrink-mode' : ''}
        ${phoneMode ? 'ml-0' : ''}`}>
        {children}
      </div>
    </>
  );
};

export default DynamicLayout;
