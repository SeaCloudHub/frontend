import { PropsWithChildren, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DynamicLayout = ({ children }: PropsWithChildren) => {
  const onShrinkChange = (mode: boolean) => setShrink(mode);
  const [shrink, setShrink] = useState<boolean>(false);
  const [phoneMode, setPhoneMode] = useState<boolean>(false);
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

  return (
    <>
      <Navbar phoneMode={phoneMode} isShrink={shrink} />
      {!phoneMode && <Sidebar onShrinkChange={onShrinkChange} />}
      <div
        className={`content-default-mode ${shrink ? 'content-shrink-mode' : ''} 
      ${phoneMode ? 'ml-0' : ''}
      `}>
        {children}
      </div>
    </>
  );
};

export default DynamicLayout;
