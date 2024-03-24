import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { ScreenMode } from '../../utils/enums/screen-mode.enum';

type ScreenModeState = {
  screenMode: ScreenMode;
  shrinkMode: boolean;
  updateScreenMode: (screenMode: ScreenMode) => void;
  updateShrinkMode: (shrinkMode: boolean) => void;
};

export const useScreenMode = create<ScreenModeState>()(
  devtools(
    persist(
      (set) => ({
        screenMode: ScreenMode.DESKTOP,
        shrinkMode: false,
        updateScreenMode: (screenMode: ScreenMode) => set((state) => ({ ...state, screenMode: screenMode })),
        updateShrinkMode: (shrinkMode: boolean) =>
          set((state) => ({
            ...state,
            screenMode: ScreenMode.DESKTOP,
            shrinkMode: shrinkMode,
          })),
      }),
      {
        name: 'screenModeStore',
        version: 1,
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'screen-mode-store', enabled: true },
  ),
);
