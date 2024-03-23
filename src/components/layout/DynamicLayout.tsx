import { PropsWithChildren, useEffect, useState } from 'react';
import { useScreenMode } from '../../store/responsive/screenMode';
import { Role } from '../../utils/enums/role.enum';
import { ScreenMode } from '../../utils/enums/screen-mode.enum';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DynamicLayout = ({ children }: PropsWithChildren) => {
  const { shrinkMode, screenMode, updateScreenMode, updateShrinkMode } = useScreenMode();
  const [role, setRole] = useState<Role>(Role.ADMIN);
  const pathName: string = 'Admin';

  useEffect(() => {
    if (pathName.startsWith('Admin')) {
      setRole(Role.ADMIN);
    }
    if (pathName.startsWith('User')) {
      setRole(Role.USER);
    }
  }, [pathName]);
  return (
    <>
      <Navbar phoneMode={screenMode == ScreenMode.MOBILE} isShrink={shrinkMode} />
      {!(screenMode == ScreenMode.MOBILE) && <Sidebar shrinkMode={shrinkMode} role={role} />}
      <div
        className={`content-default-mode p-3 ${shrinkMode ? 'content-shrink-mode' : ''}
        ${screenMode == ScreenMode.MOBILE ? 'ml-0' : ''}`}>
        {children}
      </div>
    </>
  );
};

export default DynamicLayout;
