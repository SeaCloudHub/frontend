import { PropsWithChildren } from 'react';
import { useSession } from '../../store/auth/session';
import { useScreenMode } from '../../store/responsive/screenMode';
import { ScreenMode } from '../../utils/enums/screen-mode.enum';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DynamicLayout = ({ children }: PropsWithChildren) => {
  const { shrinkMode, screenMode } = useScreenMode();
  const role = useSession((state) => state.role);

  return (
    <>
      <Navbar phoneMode={screenMode == ScreenMode.MOBILE} isShrink={shrinkMode} />
      {!(screenMode == ScreenMode.MOBILE) && <Sidebar shrinkMode={shrinkMode} role={role!} />}
      <div
        className={`content-default-mode p-3 ${shrinkMode ? 'content-shrink-mode' : ''}
        ${screenMode == ScreenMode.MOBILE ? 'ml-0' : ''}`}>
        {children}
      </div>
    </>
  );
};

export default DynamicLayout;
