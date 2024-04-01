import { PropsWithChildren } from 'react';
import { useSession } from '../../store/auth/session';
import { useScreenMode } from '../../store/responsive/screenMode';
import { ScreenMode } from '../../utils/enums/screen-mode.enum';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { classNames } from '../core/drop-down/Dropdown';
import { Role } from '@/utils/enums/role.enum';

const DynamicLayout = ({ children }: PropsWithChildren) => {
  const { shrinkMode, screenMode } = useScreenMode();
  const role = useSession((state) => state.role);

  return (
    <>
      <Navbar phoneMode={screenMode == ScreenMode.MOBILE} isShrink={shrinkMode} />
      {!(screenMode == ScreenMode.MOBILE) && <Sidebar shrinkMode={shrinkMode} role={role!} />}
      {role === Role.ADMIN ? (
        <div
          className={`content-default-mode p-3 ${shrinkMode ? 'content-shrink-mode' : ''}
        ${screenMode == ScreenMode.MOBILE ? 'ml-0' : ''}`}>
          {children}
        </div>
      ) : (
        <div
          className={classNames(
            'h-full w-full pt-[80px]',
            shrinkMode ? (screenMode == ScreenMode.MOBILE ? 'ml-0' : 'pl-[75px]') : 'pl-[300px]',
          )}>
          {children}
        </div>
      )}
    </>
  );
};

export default DynamicLayout;
