import { PropsWithChildren } from 'react';
import { useSession } from '../../store/auth/session';
import { useScreenMode } from '../../store/responsive/screenMode';
import { ScreenMode } from '../../utils/enums/screen-mode.enum';

import { Role } from '@/utils/enums/role.enum';
import { classNames } from '../core/drop-down/Dropdown';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

const DynamicLayout = ({ children }: PropsWithChildren) => {
  const { shrinkMode, screenMode } = useScreenMode();
  const role = useSession((state) => state.role);

  return (
    <div className='bg-content-bg  dark:bg-content-bg-dark dark:text-icons-color-dark'>
      <Navbar phoneMode={screenMode == ScreenMode.MOBILE} isShrink={shrinkMode} />
      {!(screenMode == ScreenMode.MOBILE) && <Sidebar shrinkMode={shrinkMode} role={role!} />}
      {role === Role.ADMIN ? (
        <div
          className={` ${screenMode == ScreenMode.DESKTOP ? (shrinkMode ? 'content-shrink-mode' : 'content-default-mode') : 'pt-4rem pl-0'}
        ${screenMode == ScreenMode.MOBILE ? 'pl-0 pt-16' : ''}`}>
          <div className='h-[calc(100vh-4rem)] w-full rounded-xl   bg-white p-2  shadow-2xl dark:bg-dashboard-dark'>
            {children}
          </div>
        </div>
      ) : (
        <div
          className={classNames(
            'h-full w-full pt-16 overflow-x-auto',
            screenMode == ScreenMode.DESKTOP ? (shrinkMode ? 'pl-[76px]' : 'pl-64') : 'pl-0',
          )}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DynamicLayout;
