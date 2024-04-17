import { create } from 'zustand';

type ProgressIndicatorState = {
  fileNames: string[];
  progress: number[];
  setFileNames: (fileName: string[]) => void;
  reset: () => void;
};

export const useProgressIndicator = create<ProgressIndicatorState>()((set) => ({
  fileNames: [],
  progress: [],
  setFileNames: (fileNames: string[]) =>
    set((state) => ({ ...state, fileNames: fileNames, progress: Array(fileNames.length).fill(100) })),
  reset: () => set((state) => ({ ...state, fileNames: [], progress: [] })),
}));
