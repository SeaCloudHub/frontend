import { useEffect, useState } from 'react';
import { useScreenMode } from '../store/responsive/screenMode';
import { ScreenMode } from '../utils/enums/screen-mode.enum';

export const useScreenHook = (width: number) => {
  const shrinkMode = useScreenMode((state) => state.shrinkMode);
  const screenMode = useScreenMode((state) => state.screenMode);
  const [state, setState] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth - (shrinkMode ? 75 : 300) <= width || screenMode == ScreenMode.MOBILE) {
        setState(true);
      } else {
        setState(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, shrinkMode, screenMode]);

  return state;
};
