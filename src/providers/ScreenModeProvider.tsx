import { useEffect } from 'react';
import { useScreenMode } from '../store/responsive/screenMode';
import { ScreenMode } from '../utils/enums/screen-mode.enum';

type ScreenModeProviderProps = {
  children: React.ReactNode;
};
const ScreenModeProvider = ({ children }: ScreenModeProviderProps) => {
  const { updateScreenMode, updateShrinkMode } = useScreenMode();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        updateShrinkMode(false);
      } else if (window.innerWidth <= 1024 && window.innerWidth > 500) {
        updateShrinkMode(true);
      } else {
        updateScreenMode(window.innerWidth <= 500 ? ScreenMode.MOBILE : ScreenMode.DESKTOP);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <>{children}</>;
};

export default ScreenModeProvider;
