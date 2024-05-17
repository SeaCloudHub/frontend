import { create } from 'zustand';

type ProgressIndicatorState = {
  fileNames: string[];
  progress: number[];
  setFileNames: (newFileNames: string[]) => void;
  reset: () => void;
};

export const useProgressIndicator = create<ProgressIndicatorState>()((set) => ({
  fileNames: [],
  progress: [],
  setFileNames: (newFileNames: string[]) =>
    set((state) => ({
      fileNames: [...state.fileNames, ...newFileNames],
      progress: [...state.progress, ...newFileNames.map(() => 100)],
    })),
  reset: () =>
    set(() => ({
      fileNames: [],
      progress: [],
    })),
}));
